defmodule Bulls.Handler do
  # Handle state for bulls game
  @moduledoc false

  alias Bulls.Game
  alias Bulls.Setup

  def new do
    Setup.new()
  end

  def view(%{people: people, winners: winners}) do
    Setup.view(%{people: people, winners: winners})
  end

  def view(game) do
    Game.view(game)
  end

  def add_player(%{people: people, winners: winners}, user_id, type) do
    Setup.add_player(%{people: people, winners: winners}, user_id, type)
  end

  def add_player(game, _, _) do
    game
  end

  def mark_player_ready(%{people: people, winners: winners}, user_id) do
    Setup.mark_player_ready(%{people: people, winners: winners}, user_id)
  end

  def mark_player_ready(game, _) do
    game
  end

  def make_guess(%{people: people, winners: winners}, _, _) do
    %{people: people, winners: winners}
  end

  def make_guess(game, user_id, guess) do
    Game.make_guess(game, user_id, guess)
  end
end
