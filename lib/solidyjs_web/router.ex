defmodule SolidyjsWeb.Router do
  use SolidyjsWeb, :router

  @csp (case MIX_ENV do
          :prod ->
            "require-trusted-types-for 'script'; script-src 'self' 'nonce-mainappv1' 'strict-dynamic' 'wasm-unsafe-eval' 'unsafe-inline' https://cdn.maptiler.com/; object-src 'none'; connect-src 'self' http://localhost:4000 https://solidyjs-lively-pine-4375.fly.dev wss://solidyjs-lively-pine-4375.fly.dev ws://solidyjs-lively-pine-4375.fly.dev ws://localhost:4000 https://api.maptiler.com/ https://*.maptiler.com/; img-src 'self' data: https://*.maptiler.com/ https://api.maptiler.com/ http://localhost:4000; worker-src 'self' blob:; style-src 'self' 'unsafe-inline'; default-src 'self' https://solidyjs-lively-pine-4375.fly.dev; frame-ancestors 'self' https://solidyjs-lively-pine-4375.fly.dev; base-uri 'self'"

          _ ->
            "script-src 'self' 'wasm-unsafe-eval' 'unsafe-inline' https://cdn.maptiler.com/; object-src 'none'; connect-src 'self' http://localhost:* ws://localhost:* wss://localhost:* https://api.maptiler.com/ https://*.maptiler.com/; img-src 'self' data: https://*.maptiler.com/ https://api.maptiler.com/; worker-src 'self' blob:; style-src 'self' 'unsafe-inline'; default-src 'self'; frame-ancestors 'self' http://localhost:*;; base-uri 'self'"
        end)

  # Two years in seconds (recommended for preload)
  @hsts_max_age 63_072_000

  @security_headers %{
    "content-security-policy" => @csp,
    "cross-origin-opener-policy" => "same-origin",
    "strict-transport-security" => "max-age=#{@hsts_max_age}; includeSubDomains; preload"
  }

  # Note: After adding 'preload', submit your domain to
  # Ensure you can maintain HTTPS for the entire domain and all subdomains
  # indefinitely before submitting

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {SolidyjsWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers, @security_headers

    plug :set_current_user
  end

  # pipeline :api do
  #   plug :accepts, ["json"]
  # end

  scope "/", SolidyjsWeb do
    pipe_through :browser

    live_session :pretend_authenticated,
      on_mount: {SolidyjsWeb.MountUserId, :ensure_authenticated} do
      live "/", StockLive, :index
      live "/map", MapLive, :index
      get "/connectivity", ConnectivityController, :check
    end
  end

  def set_current_user(conn, _opts) do
    conn
    |> get_session(:user_id)
    |> case do
      nil ->
        Plug.Conn.put_session(conn, :user_id, :rand.uniform(1000))

      _user_id ->
        conn
    end
  end

  # Enable LiveDashboard in development
  if Application.compile_env(:solidyjs, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: SolidyjsWeb.Telemetry
    end
  end
end
