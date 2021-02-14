defmodule BullsWeb.GameChannel do
  use BullsWeb, :channel

  alias Bulls.Game
  alias Bulls.BackupAgent

  @impl true
  def join("game:" <> name, _payload, socket) do
    # this function was based off class code on 2/12
    game = BackupAgent.get(name) || Game.new()
    socket = socket |> assign(:name, name) |> assign(:game, game)
    BackupAgent.put(name, game)
    view = Game.view(game)
    {:ok, view, socket}
  end

  @impl true
  def handle_in("guess", %{"guess" => guess}, socket) do
    game = socket.assigns[:game] |> Bulls.Game.make_guess(guess)
    socket = assign(socket, :game, game)
    BackupAgent.put(socket.assigns[:name], game)
    view = Bulls.Game.view(game)
    {:reply, {:ok, view}, socket}
  end

  @impl true
  def handle_in("reset", _payload, socket) do
    game = Bulls.Game.new()
    socket = assign(socket, :game, game)
    BackupAgent.put(socket.assigns[:name], game)
    view = Bulls.Game.view(game)
    {:reply, {:ok, view}, socket}
  end

  # Add authorization logic here as required.
  # defp authorized?(_payload) do
  #   true
  # end
end
