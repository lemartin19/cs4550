defmodule Bulls.Guess do
  # Handle guesses for the bulls game
  @moduledoc false

  state = %{play_state: "PLAY", guesses: [], msg: ""}

  def next_play_state(guess) do
    cond do
      state[:play_state] == "WIN" -> "WIN"
      state[:play_state] == "LOSE" -> "LOSE"
      guess == Bulls.Secret.get_secret() -> "WIN"
      Enum.count(guesses) >= 7 -> "LOSE"
      true -> "PLAY"
    end
  end

  def add_guess(guess) do
    if validate_guess(guess) == do
      [%{guess: guess, result: Bulls.Secret.bulls_and_cows(guess)} | state[:guesses]]
    else
      state[:guesses]
    end
  end

  def validate_guess(guess) do
    cond do
      state[:play_state] == "WIN" ->
        "Game already won! You must reset before making another guess."

      state[:play_state] == "LOSE" ->
        "Game already lost :( You must reset before making another guess."

      String.length(guess) != 4 ->
        "Guess must be 4 digits."

      Enum.count(Enum.uniq(String.split(guess))) != 4 ->
        "Guess digits must all be unique"

      true ->
        ""
    end
  end

  def assemble_state(guess) do
    validation = validate_guess(guess)
    %{
      play_state: next_play_state(guess),
      guesses: add_guess(guess, validation),
      msg: validation
    }
  end

  def make_guess(guess) do
    state = assemble_guess(guess)
    state
  end
end
