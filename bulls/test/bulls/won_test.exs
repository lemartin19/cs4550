defmodule Bulls.WonTest do
  use ExUnit.Case
  import Bulls

  test "new" do
    guesses = %{"lmartin" => [], "lynnsey" => [], "lynnz" => []}
    this_round = %{"lmartin" => "1234", "lynnsey" => "6283", "lynnz" => "6283"}
    new_game = Bulls.Won.new(%{secret: "1234", this_round: this_round, guesses: guesses})
    assert new_game.guesses == guesses
    assert new_game.winners == ["lmartin"]

    new_game = Bulls.Won.new(%{secret: "6283", this_round: this_round, guesses: guesses})
    assert new_game.guesses == guesses
    assert new_game.winners == ["lynnsey", "lynnz"]
  end

  test "view" do
    guesses = %{"lmartin" => [], "lynnsey" => [], "lynnz" => []}
    this_round = %{"lmartin" => "1234", "lynnsey" => "6283", "lynnz" => "6283"}
    game = Bulls.Won.new(%{secret: "1234", this_round: this_round, guesses: guesses})

    assert Bulls.Won.view(game) == %{
             play_state: "WON",
             guesses: guesses,
             winners: ["lmartin"]
           }
  end

  test "reset" do
    guesses = %{"lmartin" => [], "lynnsey" => [], "lynnz" => []}
    this_round = %{"lmartin" => "1234", "lynnsey" => "6283", "lynnz" => "6283"}
    game = Bulls.Won.new(%{secret: "1234", this_round: this_round, guesses: guesses})

    assert Bulls.Won.reset(game) == Bulls.Setup.new(["lmartin", "lynnsey", "lynnz"], ["lmartin"])
  end
end
