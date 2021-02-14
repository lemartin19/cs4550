defmodule BullsWeb.GameChannel do
  use BullsWeb, :channel

  @impl true
  def join("game:" <> id, _payload, socket) do
    game = getGame(socket, id)
    socket = assign(socket, id, game)
    view = Bulls.Game.view(game)
    {:ok, view, socket}
  end

  defp getGame(socket, id) do
    socket.assigns[id] || Bulls.Game.new()
  end

  @impl true
  def handle_in("guess", %{"guess" => guess}, socket) do
    game = socket.assigns[:game] |> Bulls.Game.make_guess(guess)
    socket = assign(socket, :game, game)
    view = Bulls.Game.view(game)
    {:reply, {:ok, view}, socket}
  end

  @impl true
  def handle_in("reset", _payload, socket) do
    game = Bulls.Game.new()
    socket = assign(socket, :game, game)
    view = Bulls.Game.view(game)
    {:reply, {:ok, view}, socket}
  end

  # Add authorization logic here as required.
  # defp authorized?(_payload) do
  #   true
  # end
end
