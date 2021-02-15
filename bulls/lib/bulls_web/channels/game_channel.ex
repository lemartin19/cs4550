defmodule BullsWeb.GameChannel do
  use BullsWeb, :channel

  alias Bulls.Handler
  alias Bulls.BackupAgent

  @impl true
  def join("game:" <> name, %{"userId" => user_id}, socket) do
    # this function was based off class code on 2/12
    game = BackupAgent.get(name) || Handler.new()
    socket = socket |> assign(:name, name) |> assign(:user_id, user_id)
    BackupAgent.put(name, game)
    view = Handler.view(game, user_id)
    {:ok, view, socket}
  end

  @impl true
  def handle_in("player-type", %{"playerType" => type}, socket) do
    user_id = socket.assigns[:user_id]

    view =
      socket.assigns[:name]
      |> BackupAgent.update(fn game -> Handler.add_player(game, user_id, type) end)
      |> Handler.view(user_id)

    {:reply, {:ok, view}, socket}
  end

  @impl true
  def handle_in("player-ready", _payload, socket) do
    user_id = socket.assigns[:user_id]

    view =
      socket.assigns[:name]
      |> BackupAgent.update(fn game -> Handler.mark_player_ready(game, user_id) end)
      |> Handler.view(user_id)

    {:reply, {:ok, view}, socket}
  end

  @impl true
  def handle_in("guess", %{"guess" => guess}, socket) do
    user_id = socket.assigns[:user_id]

    view =
      socket.assigns[:name]
      |> BackupAgent.update(fn game -> Handler.make_guess(game, user_id, guess) end)
      |> Handler.view(user_id)

    {:reply, {:ok, view}, socket}
  end

  @impl true
  def handle_in("reset", _payload, socket) do
    game = Handler.new()
    BackupAgent.put(socket.assigns[:name], game)
    view = Handler.view(game, socket.assigns[:user_id])
    {:reply, {:ok, view}, socket}
  end

  # Add authorization logic here as required.
  # defp authorized?(_payload) do
  #   true
  # end
end
