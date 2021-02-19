defmodule Bulls.SetupTest do
  use ExUnit.Case
  import Bulls

  test "new" do
    new_game = Bulls.Setup.new([], [], true)
    assert new_game.winners == []
    assert new_game.people == %{}
    assert new_game.records == %{}

    new_game = Bulls.Setup.new(["lmartin", "lynnsey"], [], true)
    assert new_game.winners == []

    assert new_game.people == %{
             "lmartin" => %{type: "PLAYER", ready: false},
             "lynnsey" => %{type: "PLAYER", ready: false}
           }

    assert new_game.records == %{"lmartin" => {0, 0}, "lynnsey" => {0, 0}}
  end

  test "view" do
    game = Bulls.Setup.new(["lmartin"], ["lmartin"], true)

    assert Bulls.Setup.view(game) == %{
             play_state: "SETUP",
             winners: ["lmartin"],
             person: %{"lmartin" => %{type: "PLAYER", ready: false}},
             num_players: 1,
             num_players_ready: 0,
             records: %{"lmartin" => {0, 0}}
           }

    game = Bulls.Setup.new(["lmartin", "lynnsey", "lynnz"], ["lmartin", "lynnsey", "lynnz"], true)

    assert Bulls.Setup.view(game) == %{
             play_state: "SETUP",
             winners: ["lmartin", "lynnsey", "lynnz"],
             person: %{
               "lmartin" => %{type: "PLAYER", ready: false},
               "lynnsey" => %{type: "PLAYER", ready: false},
               "lynnz" => %{type: "PLAYER", ready: false}
             },
             num_players: 3,
             num_players_ready: 0,
             records: %{"lmartin" => {0, 0}, "lynnsey" => {0, 0}, "lynnz" => {0, 0}}
           }

    game = game |> Bulls.Setup.add_player("other", "PLAYER")

    assert Bulls.Setup.view(game) == %{
             play_state: "SETUP",
             winners: ["lmartin", "lynnsey", "lynnz"],
             person: %{
               "lmartin" => %{type: "PLAYER", ready: false},
               "lynnsey" => %{type: "PLAYER", ready: false},
               "lynnz" => %{type: "PLAYER", ready: false},
               "other" => %{type: "PLAYER", ready: false}
             },
             num_players: 4,
             num_players_ready: 0,
             records: %{"lmartin" => {0, 0}, "lynnsey" => {0, 0}, "lynnz" => {0, 0}}
           }

    game = game |> Bulls.Setup.mark_player_ready("final")

    assert Bulls.Setup.view(game) == %{
             play_state: "SETUP",
             winners: ["lmartin", "lynnsey", "lynnz"],
             person: %{
               "lmartin" => %{type: "PLAYER", ready: false},
               "lynnsey" => %{type: "PLAYER", ready: false},
               "lynnz" => %{type: "PLAYER", ready: false},
               "other" => %{type: "PLAYER", ready: false},
               "final" => %{type: "PLAYER", ready: true}
             },
             num_players: 5,
             num_players_ready: 1,
             records: %{"lmartin" => {0, 0}, "lynnsey" => {0, 0}, "lynnz" => {0, 0}}
           }
  end

  test "add_player" do
    game = Bulls.Setup.new([], [], true) |> Bulls.Setup.add_player("lmartin", "OBSERVER")
    assert game.people == %{"lmartin" => %{type: "OBSERVER", ready: false}}

    game = game |> Bulls.Setup.add_player("lynnsey", "PLAYER")

    assert game.people == %{
             "lmartin" => %{type: "OBSERVER", ready: false},
             "lynnsey" => %{type: "PLAYER", ready: false}
           }

    game = game |> Bulls.Setup.add_player("lmartin", "PLAYER")

    assert game.people == %{
             "lmartin" => %{type: "PLAYER", ready: false},
             "lynnsey" => %{type: "PLAYER", ready: false}
           }
  end

  test "mark_player_ready" do
    game =
      Bulls.Setup.new([], [], true)
      |> Bulls.Setup.add_player("lmartin", "PLAYER")
      |> Bulls.Setup.add_player("lynnsey", "OBSERVER")
      |> Bulls.Setup.add_player("lynnz", "PLAYER")
      |> Bulls.Setup.mark_player_ready("lmartin")

    assert game.people == %{
             "lmartin" => %{type: "PLAYER", ready: true},
             "lynnsey" => %{type: "OBSERVER", ready: false},
             "lynnz" => %{type: "PLAYER", ready: false}
           }

    assert Bulls.Setup.mark_player_ready(game, "lynnsey").people == %{
             "lmartin" => %{type: "PLAYER", ready: true},
             "lynnsey" => %{type: "PLAYER", ready: true},
             "lynnz" => %{type: "PLAYER", ready: false}
           }

    game = game |> Bulls.Setup.mark_player_ready("lynnz")
    assert game.guesses == %{"lmartin" => [], "lynnz" => []}
  end
end
