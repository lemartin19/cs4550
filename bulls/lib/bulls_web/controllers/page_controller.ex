defmodule BullsWeb.PageController do
  use BullsWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def make_guess(conn, %{"guess" => guess}) do
    guess
    |> Bulls.Guess.make_guess()
    |> Json.encode!()
  end
end
