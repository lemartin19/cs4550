defmodule Bulls.Game do
  # Handle state for bulls game
  @moduledoc false

  defp is_playing(%{players: players}, user_id) do
    Enum.member?(players, user_id)
  end

  def view(%{play_state: play_state, players: players, guesses: guesses}, user_id) do
    if is_playing(%{players: players}, user_id) do
      %{play_state: play_state, guesses: guesses}
    else
      %{play_state: "OBSERVER", guesses: guesses}
    end
  end

  def new(players) do
    %{play_state: "PLAY", players: players, guesses: [], secret: make_secret()}
  end

  defp make_secret() do
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    |> Enum.shuffle()
    |> Enum.take(4)
    |> Enum.join()
  end

  def make_guess(state, user_id, guess) do
    if is_playing(state, user_id) do
      state = %{state | guesses: add_guess(state, guess)}
      %{state | play_state: next_play_state(state, guess)}
    else
      state
    end
  end

  def next_play_state(%{play_state: play_state, guesses: guesses, secret: secret}, guess) do
    cond do
      play_state == "WIN" -> "WIN"
      play_state == "LOSE" -> "LOSE"
      guess == secret -> "WIN"
      Enum.count(guesses) == 8 -> "LOSE"
      true -> "PLAY"
    end
  end

  def add_guess(%{play_state: play_state, guesses: guesses, secret: secret}, guess) do
    # guesses not allowed for "WIN", "LOSE", or poorly formatted guess
    if is_valid_guess(play_state, guess) do
      to_add = %{guess: guess, result: bulls_and_cows(secret, guess)}
      guesses ++ [to_add]
    else
      # no error displayed, guesses just won't update
      guesses
    end
  end

  def bulls_and_cows(secret, guess) do
    guess_split = split_and_strip(guess)
    secret_split = split_and_strip(secret)

    0..(Enum.count(guess_split) - 1)
    |> Enum.map(&bull_or_cow(&1, guess_split, secret_split))
  end

  def bull_or_cow(idx, guess_split, secret_split) do
    cond do
      Enum.at(guess_split, idx) == Enum.at(secret_split, idx) -> "BULL"
      Enum.member?(secret_split, Enum.at(guess_split, idx)) -> "COW"
      true -> nil
    end
  end

  def is_valid_guess(play_state, guess) do
    play_state == "PLAY" && String.length(guess) == 4 &&
      guess
      |> split_and_strip
      |> Enum.uniq()
      |> Enum.count()
      |> (fn count -> count == 4 end).()
  end

  def split_and_strip(string) do
    string |> String.split("") |> Enum.filter(&(&1 != ""))
  end
end
