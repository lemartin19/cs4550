defmodule Bulls.GameTest do
  use ExUnit.Case
  import Bulls

  test "new" do
    new_game = Bulls.Game.new()
    assert new_game.play_state == "PLAY"
    assert new_game.guesses == []
    assert String.length(new_game.secret) == 4
  end

  test "view" do
    game = Bulls.Game.new()
    assert Bulls.Game.view(game) == %{play_state: "PLAY", guesses: []}
  end

  test "make_guess" do
    play_game =
      %{play_state: "PLAY", guesses: [], secret: "1234"} |> Bulls.Game.make_guess("1235")

    assert play_game == %{
             play_state: "PLAY",
             guesses: [%{guess: "1235", result: ["BULL", "BULL", "BULL", nil]}],
             secret: "1234"
           }

    win_game = %{play_state: "PLAY", guesses: [], secret: "1234"} |> Bulls.Game.make_guess("1234")

    assert win_game == %{
             play_state: "WIN",
             guesses: [%{guess: "1234", result: ["BULL", "BULL", "BULL", "BULL"]}],
             secret: "1234"
           }

    lose_game =
      %{play_state: "PLAY", guesses: [], secret: "1234"}
      |> Bulls.Game.make_guess("1235")
      |> Bulls.Game.make_guess("1235")
      |> Bulls.Game.make_guess("1235")
      |> Bulls.Game.make_guess("1235")
      |> Bulls.Game.make_guess("1235")
      |> Bulls.Game.make_guess("1235")
      |> Bulls.Game.make_guess("1235")
      |> Bulls.Game.make_guess("1235")

    assert lose_game.play_state == "LOSE"
    assert Enum.count(lose_game.guesses) == 8

    assert Enum.at(lose_game.guesses, 1) == %{
             guess: "1235",
             result: ["BULL", "BULL", "BULL", nil]
           }
  end

  test "add_guess" do
    state = %{play_state: "PLAY", guesses: [], secret: "1234"}

    assert Bulls.Game.add_guess(state, "5678") == [%{guess: "5678", result: [nil, nil, nil, nil]}]
    assert Bulls.Game.add_guess(state, "1111") == []
    assert Bulls.Game.add_guess(state, "123") == []

    assert Bulls.Game.add_guess(state, "6283") == [
             %{guess: "6283", result: [nil, "BULL", nil, "COW"]}
           ]

    assert Bulls.Game.add_guess(state, "1234") == [
             %{guess: "1234", result: ["BULL", "BULL", "BULL", "BULL"]}
           ]
  end

  test "bulls_and_cows" do
    assert Bulls.Game.bulls_and_cows("1234", "1234") == ["BULL", "BULL", "BULL", "BULL"]
    assert Bulls.Game.bulls_and_cows("6832", "1234") == [nil, "COW", "BULL", nil]
    assert Bulls.Game.bulls_and_cows("5678", "1234") == [nil, nil, nil, nil]
  end

  test "bull_or_cow" do
    assert Bulls.Game.bull_or_cow(0, ["1", "2", "3", "4"], ["1", "2", "3", "4"]) == "BULL"
    assert Bulls.Game.bull_or_cow(1, ["1", "2", "3", "4"], ["6", "8", "3", "2"]) == "COW"
    assert Bulls.Game.bull_or_cow(3, ["1", "2", "3", "4"], ["6", "8", "3", "2"]) == nil
  end

  test "is_valid_guess" do
    assert Bulls.Game.is_valid_guess("PLAY", "1234")
    assert Bulls.Game.is_valid_guess("PLAY", "6283")
    assert not Bulls.Game.is_valid_guess("WIN", "1234")
    assert not Bulls.Game.is_valid_guess("LOSE", "1234")
    assert not Bulls.Game.is_valid_guess("PLAY", "1111")
    assert not Bulls.Game.is_valid_guess("PLAY", "123")
  end
end
