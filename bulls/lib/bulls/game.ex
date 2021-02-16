defmodule Bulls.Game do
  # Handle state for bulls game
  @moduledoc false

  def new(players) do
    guesses =
      Enum.reduce(
        players,
        %{},
        fn user_id, acc ->
          Map.merge(acc, %{user_id => []})
        end
      )

    %{this_round: %{}, guesses: guesses, secret: make_secret()}
  end

  defp is_playing(%{guesses: guesses}, user_id) do
    Map.has_key?(guesses, user_id)
  end

  def view(state, user_id) do
    %{guesses: guesses} = state

    if is_playing(state, user_id) do
      %{play_state: "PLAY", guesses: guesses}
    else
      %{play_state: "OBSERVER", guesses: guesses}
    end
  end

  defp make_secret() do
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    |> Enum.shuffle()
    |> Enum.take(4)
    |> Enum.join()
  end

  def make_guess(state, user_id, guess) do
    if is_playing(state, user_id) do
      state = %{state | this_round: add_guess(state, user_id, guess)}
      check_all_guesses(state)
    else
      state
    end
  end

  defp check_all_guesses(state) do
    %{this_round: this_round, guesses: guesses} = state

    if Enum.count(this_round) < Enum.count(guesses) do
      state
    else
      all_guesses_in(state)
    end
  end

  defp all_guesses_in(%{this_round: this_round, guesses: guesses, secret: secret}) do
    same_as_secret = fn {_, guess} -> guess == secret end

    if Enum.any?(this_round, same_as_secret) do
      end_game(this_round, same_as_secret)
    else
      combine_guesses(this_round, guesses, secret)
    end
  end

  defp end_game(this_round, same_as_secret) do
    this_round
    |> Enum.filter(same_as_secret)
    |> Enum.map(fn {user_id, _} -> user_id end)
    |> Bulls.Setup.new()
  end

  defp combine_guesses(this_round, guesses, secret) do
    new_guesses =
      Enum.reduce(
        this_round,
        guesses,
        fn {user_id, guess}, acc ->
          to_add = %{guess: guess, result: bulls_and_cows(secret, guess)}
          {:ok, previous_guesses} = Map.fetch(acc, user_id)
          %{acc | user_id => [to_add | previous_guesses]}
        end
      )

    %{secret: secret, guesses: new_guesses, this_round: %{}}
  end

  def add_guess(%{this_round: this_round}, user_id, guess) do
    # guesses not allowed for bad guesses
    if is_valid_guess(this_round, user_id, guess) do
      Map.merge(this_round, %{user_id => guess})
    else
      # no error displayed, guesses just won't update
      this_round
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

  def is_valid_guess(this_round, user_id, guess) do
    !Map.has_key?(this_round, user_id) &&
      String.length(guess) == 4 &&
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
