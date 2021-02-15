defmodule Bulls.Setup do
  # Handle state for bulls game
  @moduledoc false

  defp is_player({_, %{type: type}}) do
    type == "PLAYER"
  end

  defp is_ready({_, %{ready: ready}}) do
    ready
  end

  def view(%{people: people}, user_id) do
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
      num_players: Enum.count(people, &is_player(&1))
    }
  end

  def new() do
    %{people: %{}}
  end

  defp set_person(people, user_id, person) do
    Map.merge(people, %{user_id => person})
  end

  def add_player(%{people: people}, user_id, type) do
    %{people: set_person(people, user_id, %{type: type, ready: false})}
  end

  def mark_player_ready(%{people: people}, user_id) do
    if people |> Enum.filter(&is_player(&1)) |> Enum.all?(&is_ready(&1)) do
      %{people: set_person(people, user_id, %{type: "PLAYER", ready: true})}
    else
      people
      |> Enum.filter(&is_player(&1))
      |> Enum.map(fn {id, _} -> id end)
      |> Bulls.Game.new()
    end
  end
end
