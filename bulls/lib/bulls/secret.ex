defmodule Bulls.Secret do
  # Create and handle the secret for the bulls game
  @moduledoc false

  secret = ""

  def bull_or_cow(idx, guess_split, secret_split) when is_list(guess_split) and is_list(secret_split) do
    cond do
      guess_split[idx] == secret_split[idx] -> "BULL"
      Enum.member?(secret_split, guess_split[idx]) -> "COW"
      true -> null
    end
  end

  def bulls_and_cows(guess) do
    secret_split = String.split(secret, "")
    guess_split = String.split(guess, "")

    result = []
    for idx in 0..Enum.count(guess_split) do
      result = [bull_or_cow(idx, guess_split, secret_split) | result]
    end
    result
  end

  def get_secret() do
    unless secret do
      make_secret()
    end

    secret
  end

  # allows the secret to begin with zero
  def make_secret() do
    secret = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    |> Enum.shuffle()
    |> Enum.take(4)
    |> Enum.join()
    secret
  end
end
