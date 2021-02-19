defmodule Bulls.Handler do
  # Handle state for bulls game
  @moduledoc false

  alias Bulls.Game
  alias Bulls.Setup
  alias Bulls.Won

  def new do
    Setup.new()
  end

  def reset(%{people: people, winners: winners, records: records}) do
    %{people: people, winners: winners, records: records}
  end

  def reset(%{guesses: guesses, winners: winners}) do
    Won.reset(%{guesses: guesses, winners: winners})
  end

  def reset(game) do
    Game.reset(game)
  end

  def view(%{people: people, winners: winners, records: records}) do
    Setup.view(%{people: people, winners: winners, records: records})
  end

  def view(%{guesses: guesses, winners: winners}) do
    Won.view(%{guesses: guesses, winners: winners})
  end

  def view(game) do
    Game.view(game)
  end

  def view(%{play_state: "WON", guesses: guesses, winners: winners}, _user_id) do
    %{play_state: "WON", guesses: guesses, winners: winners}
  end

  def view(%{play_state: "PLAY", guesses: guesses, this_round: this_round}, user_id) do
    current_guess =
      if Map.has_key?(this_round, user_id) do
        this_round[user_id]
      else
        nil
      end

    %{play_state: "PLAY", guesses: guesses, current_guess: current_guess}
  end

  def view(full_view, user_id) do
    person =
      if Map.has_key?(full_view.person, user_id) do
        full_view.person[user_id]
      else
        %{type: "OBSERVER", ready: false}
      end

    %{full_view | person: person}
  end

  def add_player(%{people: people, winners: winners, records: records}, user_id, type) do
    Setup.add_player(%{people: people, winners: winners, records: records}, user_id, type)
  end

  def add_player(game, _, _) do
    game
  end

  def mark_player_ready(%{people: people, winners: winners, records: records}, user_id) do
    Setup.mark_player_ready(%{people: people, winners: winners, records: records}, user_id)
  end

  def mark_player_ready(game, _) do
    game
  end

  def make_guess(%{people: people, winners: winners, records: records}, _, _) do
    %{people: people, winners: winners, records: records}
  end

  def make_guess(%{guesses: guesses, winners: winners}, _, _) do
    %{guesses: guesses, winners: winners}
  end

  def make_guess(game, user_id, guess) do
    Game.make_guess(game, user_id, guess)
  end

  def one_second_passed(%{people: people, winners: winners, records: records}) do
    {false, %{people: people, winners: winners, records: records}}
  end

  def one_second_passed(%{guesses: guesses, winners: winners}) do
    {false, %{guesses: guesses, winners: winners}}
  end

  def one_second_passed(game) do
    {true, Game.one_second_passed(game)}
  end
end
