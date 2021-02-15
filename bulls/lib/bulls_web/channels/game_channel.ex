defmodule BullsWeb.GameChannel do
  use BullsWeb, :channel

  alias Bulls.GameSetup
  alias Bulls.Game
  alias Bulls.BackupAgent

  @impl true
  def join("game:" <> name, %{"userId" => user_id}, socket) do
    # this function was based off class code on 2/12
    game = BackupAgent.get(name) || GameSetup.new()
    socket = socket |> assign(:name, name) |> assign(:game, game) |> assign(:user_id, user_id)
    BackupAgent.put(name, game)
    view = GameSetup.view(game, user_id)
    {:ok, view, socket}
  end

  @impl true
  def handle_in("player-type", %{"playerType" => type}, socket) do
    user_id = socket.assigns[:user_id]
    game = socket.assigns[:game] |> GameSetup.add_player(user_id, type)
    BackupAgent.put(socket.assigns[:name], game)
    view = GameSetup.view(game, user_id)
    {:reply, {:ok, view}, socket}
  end

  @impl true
  def handle_in("guess", %{"guess" => guess}, socket) do
    game = socket.assigns[:game] |> Game.make_guess(guess)
    socket = assign(socket, :game, game)
    BackupAgent.put(socket.assigns[:name], game)
    view = Game.view(game)
    {:reply, {:ok, view}, socket}
  end

  @impl true
  def handle_in("reset", _payload, socket) do
    game = GameSetup.new()
    socket = assign(socket, :game, game)
    BackupAgent.put(socket.assigns[:name], game)
    view = GameSetup.view(game, socket.assigns[:user_id])
    {:reply, {:ok, view}, socket}
  end

  # Add authorization logic here as required.
  # defp authorized?(_payload) do
  #   true
  # end
end
