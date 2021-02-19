defmodule BullsWeb.GameChannel do
  use BullsWeb, :channel

  alias Bulls.GameManager

  @impl true
  def join("game:" <> name, %{"userId" => user_id}, socket) do
    socket = socket |> assign(:name, name) |> assign(:user_id, user_id)
    GameManager.setup()
    GameManager.start(name)
    {:ok, view} = GameManager.add_player(name, user_id, "OBSERVER")
    {:ok, view, socket}
  end

  @impl true
  def handle_in("player-type", %{"playerType" => type}, socket) do
    name = socket.assigns[:name]
    user_id = socket.assigns[:user_id]
    {:ok, view} = GameManager.add_player(name, user_id, type)

    broadcast!(socket, "player-type", view)
    {:noreply, socket}
  end

  @impl true
  def handle_in("player-ready", _payload, socket) do
    name = socket.assigns[:name]
    user_id = socket.assigns[:user_id]
    {:ok, view} = GameManager.mark_player_ready(name, user_id)

    broadcast!(socket, "player-ready", view)
    {:noreply, socket}
  end

  @impl true
  def handle_in("guess", %{"guess" => guess}, socket) do
    name = socket.assigns[:name]
    user_id = socket.assigns[:user_id]
    {:ok, view} = GameManager.guess(name, user_id, guess)

    broadcast!(socket, "guess", view)
    {:noreply, socket}
  end

  @impl true
  def handle_in("reset", _payload, socket) do
    name = socket.assigns[:name]
    {:ok, view} = GameManager.reset(name)

    broadcast!(socket, "reset", view)
    {:noreply, socket}
  end

  intercept ["guess", "player-type"]

  @impl true
  def handle_out("guess", full_view, socket) do
    %{play_state: play_state, guesses: guesses, this_round: this_round} = full_view
    user_id = socket.assigns[:user_id]

    current_guess =
      if Map.has_key?(this_round, user_id) do
        this_round[user_id]
      else
        nil
      end

    user_view = %{play_state: play_state, guesses: guesses, current_guess: current_guess}
    push(socket, "guess", user_view)
    {:noreply, socket}
  end

  @impl true
  def handle_out("player-type", full_view, socket) do
    user_id = socket.assigns[:user_id]

    person =
      if Map.has_key?(full_view.person, user_id) do
        full_view.person[user_id]
      else
        %{type: "OBSERVER", ready: false}
      end

    user_view = %{full_view | person: person}
    push(socket, "player-type", user_view)
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  # defp authorized?(_payload) do
  #   true
  # end
end
