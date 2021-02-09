defmodule BullsWeb.PageControllerTest do
  use BullsWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "garbage"
  end

  test "POST /make_guess", %{conn: conn} do
    conn = post(conn, "/make_guess", %{"guess" => "1234"})
    assert html_response(conn, 200) =~ "1234"
  end
end
