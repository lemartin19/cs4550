defmodule Bulls.Setup do
  # Handle state for bulls game
  @moduledoc false

  def new() do
    new([])
  end

  def new(winners) do
    %{people: %{}, winners: winners}
  end

  defp is_player({_, %{type: type}}) do
    type == "PLAYER"
  end

  defp is_ready({_, %{ready: ready}}) do
    ready
  end

  def view(%{people: people, winners: winners}, user_id) do
    person =
      if Map.has_key?(people, user_id) do
        people[user_id]
      else
        %{type: "OBSERVER", ready: false}
      end

    %{
      play_state: "SETUP",
      player: person,
      num_players_ready: people |> Enum.filter(&is_player(&1)) |> Enum.count(&is_ready(&1)),
      num_players: Enum.count(people, &is_player(&1)),
      winners: winners
    }
  end

  defp set_person(people, user_id, person) do
    Map.merge(people, %{user_id => person})
  end

  def add_player(%{winners: winners, people: people}, user_id, type) do
    %{winners: winners, people: set_person(people, user_id, %{type: type, ready: false})}
  end

  def mark_player_ready(%{winners: winners, people: people}, user_id) do
    if people |> Enum.filter(&is_player(&1)) |> Enum.all?(&is_ready(&1)) do
      %{winners: winners, people: set_person(people, user_id, %{type: "PLAYER", ready: true})}
    else
      people
      |> Enum.filter(&is_player(&1))
      |> Enum.map(fn {id, _} -> id end)
      |> Bulls.Game.new()
    end
  end
end
