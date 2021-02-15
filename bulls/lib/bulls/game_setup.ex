defmodule Bulls.GameSetup do
  # Handle state for bulls game
  @moduledoc false

  defp is_player({_, %{type: type}}) do
    type == "PLAYER"
  end

  defp is_ready({_, %{ready: ready}}) do
    ready
  end

  def view(%{players: players}, user_id) do
    player =
      if Map.has_key?(players, user_id) do
        players[user_id]
      else
        %{type: "OBSERVER", ready: false}
      end

    %{
      play_state: "SETUP",
      player: player,
      num_players_ready: players |> Enum.filter(&is_player(&1)) |> Enum.count(&is_ready(&1)),
      num_players: Enum.count(players, &is_player(&1))
    }
  end

  def new() do
    %{players: %{}}
  end

  defp set_player(players, user_id, player) do
    Map.merge(players, %{user_id => player})
  end

  def add_player(%{players: players}, user_id, type) do
    %{players: set_player(players, user_id, %{type: type, ready: false})}
  end

  def mark_player_ready(%{players: players}, user_id) do
    if players |> Enum.filter(&is_player(&1)) |> Enum.all?(&is_ready(&1)) do
      %{players: set_player(players, user_id, %{type: "PLAYER", ready: true})}
    else
      Bulls.Game.new()
    end
  end
end
