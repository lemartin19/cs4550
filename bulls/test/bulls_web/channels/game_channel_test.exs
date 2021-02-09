defmodule BullsWeb.GameChannelTest do
  use BullsWeb.ChannelCase

  setup do
    {:ok, _, socket} =
      BullsWeb.UserSocket
      |> subscribe_and_join(BullsWeb.GameChannel, "game:1")

    %{socket: socket}
  end

  # test "guess replies with status ok", %{socket: socket} do
  #   ref = push(socket, "guess", %{"guess" => "1234"})
  #   assert_reply(ref, :ok, %{play_state: "PLAY", guesses: [%{guess: 1234, result: }]})
  # end
end
