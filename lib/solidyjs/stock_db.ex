defmodule Solidyjs.StockDb do
  use GenServer
  alias Exqlite.Sqlite3
  alias Phoenix.PubSub
  require Logger

  def start_link(opts) do
    GenServer.start_link(__MODULE__, opts, name: __MODULE__)
  end

  def get_stock do
    GenServer.call(__MODULE__, :get_stock)
  end

  def update_stock(value, y_state) when is_integer(value) do
    GenServer.call(__MODULE__, {:update_stock, value, y_state})
  end

  @doc """
  When a client reconnects, we need to:
  1. Get the current state from SQLite
  2. Compare it with the client's state
  3. Take the lowest value between them
  4. If client's value is lower, update SQLite and broadcast
  5. If SQLite's value is lower, return it to update client
  """
  def handle_client_reconnection(client_value, client_state) when is_integer(client_value) do
    GenServer.call(__MODULE__, {:handle_reconnection, client_value, client_state})
  end

  #### callbacks ###########################

  @impl true
  def init([db, table_name]) do
    case Sqlite3.open(db) do
      {:ok, conn} ->
        # Set pragmas for better performance
        :ok = Sqlite3.execute(conn, "PRAGMA busy_timeout = 5000")
        :ok = Sqlite3.execute(conn, "PRAGMA journal_mode = WAL")
        :ok = Sqlite3.execute(conn, "PRAGMA synchronous = NORMAL")

        state = %{conn: conn, db: db, name: table_name}
        {:ok, state}

      {:error, reason} ->
        Logger.error("Failed to open stock database: #{inspect(reason)}")
        {:stop, reason}
    end
  end

  @impl true
  def handle_call(:get_stock, _from, state) do
    %{conn: conn, name: name} = state
    {:reply, get_current_stock(conn, name), state}
  end

  def handle_call(
        {:handle_reconnection, client_value, client_state},
        _from,
        state
      ) do
    %{conn: conn, name: name} = state
    {server_value, server_state} = get_current_stock(conn, name)

    if client_value < server_value do
      # Client has a lower value, update SQLite directly
      with {:ok, statement} <-
             Sqlite3.prepare(conn, "UPDATE #{name} SET value = ?, state = ? WHERE id = 'stock'"),
           #  Sqlite3.bind(statement, [client_value, Jason.encode!(client_state)]),
           :ok <-
             Sqlite3.bind(statement, [client_value, client_state]),
           :done <-
             Sqlite3.step(conn, statement),
           :ok <-
             Sqlite3.release(conn, statement),
           :ok <-
             PubSub.broadcast(:pubsub, "stock", {:y_update, client_value, client_state}) do
        {:reply, {:client_wins, client_value, client_state}, state}
      else
        msg ->
          Logger.error("Failed to update stock during reconnection: #{inspect(msg)}")
          {:reply, {:server_wins, server_value, server_state}, state}
      end
    else
      # Server has lower or equal value
      {:reply, {:server_wins, server_value, server_state}, state}
    end
  end

  @impl true
  def handle_call({:update_stock, value, y_state}, _from, state) do
    %{conn: conn, name: name} = state
    {current_value, _current_state} = get_current_stock(conn, name) |> dbg()

    if value < current_value do
      with {:ok, statement} <-
             Sqlite3.prepare(conn, "UPDATE #{name} SET value = ?, state = ? WHERE id = 'stock'"),
           :ok <-
             Sqlite3.bind(statement, [value, y_state]),
           :done <-
             Sqlite3.step(conn, statement),
           :ok <-
             Sqlite3.release(conn, statement),
           encoded_y_state =
             Base.encode64(y_state),
           :ok <-
             PubSub.broadcast(:pubsub, "stock", {:y_update, value, encoded_y_state}) do
        {:reply, {value, y_state}, state}
      else
        msg ->
          Logger.error("Failed to update stock: #{inspect(msg)}")
          {:reply, {current_value, y_state}, state}
      end
    else
      Logger.debug(
        "Not updating stock as new value (#{value}) is not lower than current (#{current_value})"
      )

      {:reply, {current_value, y_state}, state}
    end
  end

  defp get_current_stock(conn, name) do
    with {:ok, statement} <-
           Sqlite3.prepare(conn, "SELECT value, state FROM #{name} WHERE id = ?"),
         :ok <-
           Sqlite3.bind(statement, ["stock"]),
         result <-
           get_result(conn, statement, name),
         :ok <-
           Sqlite3.release(conn, statement) do
      result
    else
      {:error, reason} ->
        Logger.error("Failed to get stock: #{inspect(reason)}")
        {20, <<>>}
    end
  end

  defp get_result(conn, statement, name) do
    case Sqlite3.step(conn, statement) do
      {:row, [value, state_bin]} when is_binary(state_bin) ->
        Logger.info("get result, found :row")

        {value, state_bin}

      :done ->
        Logger.info("Init stock")
        init_stock(conn, name)

      _ ->
        {20, <<>>}
    end
  end

  defp init_stock(conn, name) do
    value = 20
    state = <<>>

    with {:ok, statement} <-
           Sqlite3.prepare(
             conn,
             "INSERT OR IGNORE INTO #{name} (id, value, state) VALUES (?, ?, ?)"
           ),
         :ok <-
           Sqlite3.bind(statement, ["stock", value, state]),
         :done <-
           Sqlite3.step(conn, statement),
         :ok <-
           Sqlite3.release(conn, statement) do
      {value, state}
    else
      {:error, reason} ->
        Logger.error("Failed to initialize stock: #{inspect(reason)}")
        {20, <<>>}
        # {20, []}
    end
  end
end
