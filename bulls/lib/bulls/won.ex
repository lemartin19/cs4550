defmodule Bulls.Won do
  # Handle state for bulls game
  @moduledoc false

  def new(%{secret: secret, guesses: guesses, this_round: this_round}) do
    winners =
      this_round
      |> Enum.filter(fn {_, guess} -> guess == secret end)
      |> Enum.map(fn {user_id, _} -> user_id end)

    Enum.map(this_round, fn {user_id, guess} ->
      if guess == secret do
        Bulls.UserAgent.incWin(user_id)
      else
        Bulls.UserAgent.incLoss(user_id)
      end
    end)

    %{guesses: guesses, winners: winners}
  end

  def view(%{guesses: guesses, winners: winners}) do
    %{play_state: "WON", guesses: guesses, winners: winners}
  end

  def reset(%{guesses: guesses, winners: winners}) do
    players = Enum.map(guesses, fn {user_id, _} -> user_id end)
    Bulls.Setup.new(players, winners)
  end
end
