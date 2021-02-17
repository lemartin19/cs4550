defmodule Bulls.UserAgent do
  use Agent

  def start_link(_arg) do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  def addPlayer(name) do
    Agent.update(__MODULE__, fn state ->
      Map.put(state, name, {0, 0})
    end)
  end

  def incWin(name) do
    {win, loss} =
      Agent.get(__MODULE__, fn state ->
        Map.get(state, name)
      end)

    Agent.update(__MODULE__, fn state ->
      Map.put(state, name, {win + 1, loss})
    end)
  end

  def incLoss(name) do
    {win, loss} =
      Agent.get(__MODULE__, fn state ->
        Map.get(state, name)
      end)

    Agent.update(__MODULE__, fn state ->
      Map.put(state, name, {win, loss + 1})
    end)
  end

  def get(name) do
    Agent.get(__MODULE__, fn state ->
      Map.get(state, name)
    end)
  end
end
