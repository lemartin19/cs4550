defmodule Bulls.SetupTest do
  use ExUnit.Case
  import Bulls

  test "new" do
    new_game = Bulls.Setup.new([])
    assert new_game.winners == []
    assert new_game.people == %{}

    new_game = Bulls.Setup.new(["lmartin", "lynnsey"])
    assert new_game.winners == ["lmartin", "lynnsey"]
    assert new_game.people == %{}
  end

  test "view" do
    game = Bulls.Setup.new(["lmartin"])

    assert Bulls.Setup.view(game, "lmartin") == %{
             play_state: "SETUP",
             player: %{type: "OBSERVER", ready: false},
             winners: ["lmartin"],
             num_players: 0,
             num_players_ready: 0
           }

    game = Bulls.Setup.new(["lmartin", "lynnsey", "lynnz"])

    assert Bulls.Setup.view(game, "other") == %{
             play_state: "SETUP",
             player: %{type: "OBSERVER", ready: false},
             winners: ["lmartin", "lynnsey", "lynnz"],
             num_players: 0,
             num_players_ready: 0
           }

    game = game |> Bulls.Setup.add_player("other", "PLAYER")

    assert Bulls.Setup.view(game, "other") == %{
             play_state: "SETUP",
             player: %{type: "PLAYER", ready: false},
             winners: ["lmartin", "lynnsey", "lynnz"],
             num_players: 1,
             num_players_ready: 0
           }

    game = game |> Bulls.Setup.mark_player_ready("lmartin")

    assert Bulls.Setup.view(game, "other") == %{
             play_state: "SETUP",
             player: %{type: "PLAYER", ready: false},
             winners: ["lmartin", "lynnsey", "lynnz"],
             num_players: 2,
             num_players_ready: 1
           }
  end

  test "add_player" do
    game = Bulls.Setup.new([]) |> Bulls.Setup.add_player("lmartin", "OBSERVER")
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
      Bulls.Setup.new([])
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
