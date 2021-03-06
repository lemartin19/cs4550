defmodule Bulls.GameTest do
  use ExUnit.Case
  import Bulls

  test "new" do
    new_game = Bulls.Game.new([])
    assert new_game.guesses == %{}
    assert new_game.this_round == %{}
    assert String.length(new_game.secret) == 4

    new_game = Bulls.Game.new(["lmartin"])
    assert new_game.guesses == %{"lmartin" => []}
    assert new_game.this_round == %{}
    assert String.length(new_game.secret) == 4
  end

  test "view" do
    game = Bulls.Game.new(["lmartin"])

    assert Bulls.Game.view(game) == %{
             play_state: "PLAY",
             guesses: %{"lmartin" => []},
             this_round: %{},
             time_left: 30
           }

    game = Bulls.Game.new(["lmartin", "lynnsey", "lynnz"])

    assert Bulls.Game.view(game) == %{
             play_state: "PLAY",
             guesses: %{"lmartin" => [], "lynnsey" => [], "lynnz" => []},
             this_round: %{},
             time_left: 30
           }
  end

  test "make_guess" do
    state = %{this_round: %{}, guesses: %{"lmartin" => []}, secret: "6832", time_left: 12}

    assert Bulls.Game.make_guess(state, "lmartin", "1234") ==
             Map.merge(state, %{
               time_left: 30,
               guesses: %{"lmartin" => [%{guess: "1234", result: [nil, "COW", "BULL", nil]}]}
             })

    assert Bulls.Game.make_guess(state, "lynnz", "1234") == state
    assert Bulls.Game.make_guess(state, "lmartin", "123") == state
    assert Bulls.Game.make_guess(state, "lmartin", "1233") == state
    assert Bulls.Game.make_guess(state, "lmartin", "12344") == state

    state =
      state
      |> Bulls.Game.make_guess("lmartin", "1234")
      |> Bulls.Game.make_guess("lmartin", "5678")

    assert state.guesses == %{
             "lmartin" => [
               %{guess: "5678", result: [nil, "COW", nil, "COW"]},
               %{guess: "1234", result: [nil, "COW", "BULL", nil]}
             ]
           }

    won_state = %{
      secret: "6832",
      time_left: 12,
      this_round: %{"lmartin" => "6832"},
      guesses: %{
        "lmartin" => [
          %{guess: "6832", result: ["BULL", "BULL", "BULL", "BULL"]},
          %{guess: "5678", result: [nil, "COW", nil, "COW"]},
          %{guess: "1234", result: [nil, "COW", "BULL", nil]}
        ]
      }
    }

    assert Bulls.Game.make_guess(state, "lmartin", "6832") ==
             Bulls.Won.new(won_state)

    state =
      %{
        this_round: %{},
        guesses: %{"lmartin" => [], "lynnsey" => [], "lynnz" => []},
        secret: "6832",
        time_left: 12
      }
      |> Bulls.Game.make_guess("lynnz", "1234")
      |> Bulls.Game.make_guess("lmartin", "5678")
      |> Bulls.Game.make_guess("lynnsey", "9012")

    assert state.this_round == %{}

    assert state.guesses == %{
             "lynnz" => [%{guess: "1234", result: [nil, "COW", "BULL", nil]}],
             "lmartin" => [%{guess: "5678", result: [nil, "COW", nil, "COW"]}],
             "lynnsey" => [%{guess: "9012", result: [nil, nil, nil, "BULL"]}]
           }

    assert Enum.count(state.guesses) == 3
    assert Enum.all?(state.guesses, fn {_, guesses} -> Enum.count(guesses) == 1 end)
    assert Bulls.Game.make_guess(state, "other", "9034") == state
    assert Bulls.Game.make_guess(state, "lmartin", "9034").this_round == %{"lmartin" => "9034"}
    assert Bulls.Game.make_guess(state, "lynnz", "9034").this_round == %{"lynnz" => "9034"}

    state =
      state
      |> Bulls.Game.make_guess("lynnz", "1234")
      |> Bulls.Game.make_guess("lmartin", "6832")

    assert Bulls.Game.make_guess(state, "lmartin", "9034") == state

    won_state =
      state
      |> Map.update!(:this_round, fn this_round -> Map.put(this_round, "lynnsey", "6832") end)
      |> Map.put(:guesses, %{
        "lmartin" => [
          %{guess: "6832", result: ["BULL", "BULL", "BULL", "BULL"]},
          %{guess: "5678", result: [nil, "COW", nil, "COW"]}
        ],
        "lynnsey" => [
          %{guess: "6832", result: ["BULL", "BULL", "BULL", "BULL"]},
          %{guess: "9012", result: [nil, nil, nil, "BULL"]}
        ],
        "lynnz" => [
          %{guess: "1234", result: [nil, "COW", "BULL", nil]},
          %{guess: "1234", result: [nil, "COW", "BULL", nil]}
        ]
      })

    assert Bulls.Game.make_guess(state, "lynnsey", "6832") ==
             Bulls.Won.new(won_state)
  end

  test "add_guess" do
    state = %{this_round: %{"lmartin" => "1234"}}

    assert Bulls.Game.add_guess(state, "lmartin", "5678") == state.this_round
    assert Bulls.Game.add_guess(state, "lynnz", "1111") == state.this_round
    assert Bulls.Game.add_guess(state, "lynnz", "123") == state.this_round

    assert Bulls.Game.add_guess(state, "lynnz", "6283") == %{
             "lmartin" => "1234",
             "lynnz" => "6283"
           }
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
    assert Bulls.Game.is_valid_guess(%{}, "lmartin", "1234")
    assert Bulls.Game.is_valid_guess(%{"lmartin" => "1234"}, "lynnz", "1234")
    assert Bulls.Game.is_valid_guess(%{"lmartin" => "1234"}, "lynnz", "PASS")
    assert not Bulls.Game.is_valid_guess(%{"lmartin" => "1234"}, "lmartin", "1234")
    assert not Bulls.Game.is_valid_guess(%{"lmartin" => "1234"}, "lynnz", "123")
    assert not Bulls.Game.is_valid_guess(%{"lmartin" => "1234"}, "lynnz", "12345")
    assert not Bulls.Game.is_valid_guess(%{"lmartin" => "1234"}, "lynnz", "1233")
    assert not Bulls.Game.is_valid_guess(%{"lmartin" => "1234"}, "lynnz", "12344")
    assert not Bulls.Game.is_valid_guess(%{"lmartin" => "1234"}, "lmartin", "PASS")
  end
end
