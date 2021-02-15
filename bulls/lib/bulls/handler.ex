defmodule Bulls.Handler do
  # Handle state for bulls game
  @moduledoc false

  alias Bulls.Game
  alias Bulls.Setup

  def new do
    Setup.new()
  end

  def view(%{people: people}, user_id) do
    Setup.view(%{people: people}, user_id)
  end

  def view(game, user_id) do
    Game.view(game, user_id)
  end

  def add_player(%{people: people}, user_id, type) do
    Setup.add_player(%{people: people}, user_id, type)
  end

  def add_player(game, _, _) do
    game
  end

  def mark_player_ready(%{people: people}, user_id) do
    Setup.mark_player_ready(%{people: people}, user_id)
  end

  def mark_player_ready(game, _) do
    game
  end

  def make_guess(%{people: people}, _, _) do
    %{people: people}
  end

  def make_guess(game, user_id, guess) do
    Game.make_guess(game, user_id, guess)
  end
end
