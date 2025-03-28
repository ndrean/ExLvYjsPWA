defmodule SolidyjsWeb.Menu do
  use Phoenix.Component
  import SolidyjsWeb.CoreComponents, only: [icon: 1]
  use SolidyjsWeb, :verified_routes

  def display(assigns) do
    ~H"""
    <nav class="bg-gradient-to-r from-blue-200 to-purple-200 p-4 rounded-lg shadow-md">
      <div class="flex justify-between items-center">
        <.link
          navigate={~p"/"}
          replace
          class="px-4 py-2 border-2 rounded-md text-midnightblue bg-bisque hover:text-bisque hover:bg-midnightblue transition-colors duration-300"
        >
          <span>
            <.icon name="hero-home-solid" /> &nbsp Dashboard &nbsp <.icon name="hero-chart-bar" />
          </span>
        </.link>
        <.link
          navigate={~p"/map"}
          replace
          class="px-4 py-2 border-2 rounded-md text-midnightblue bg-bisque hover:text-bisque hover:bg-midnightblue transition-colors duration-300"
        >
          <span>
            <.icon name="hero-cpu-chip" /> &nbsp Leaflet &nbsp <.icon name="hero-globe-alt" />
          </span>
        </.link>
      </div>
    </nav>
    """
  end
end
