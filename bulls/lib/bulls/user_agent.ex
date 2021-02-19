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
    Agent.update(__MODULE__, fn state ->
      Map.update(state, name, %{wins: 1, losses: 0}, fn %{wins: wins, losses: losses} ->
        %{wins: wins + 1, losses: losses}
      end)
    end)
  end

  def incLoss(name) do
    Agent.update(__MODULE__, fn state ->
      Map.update(state, name, %{wins: 0, losses: 1}, fn %{wins: wins, losses: losses} ->
        %{wins: wins, losses: losses + 1}
      end)
    end)
  end

  def get(name) do
    Agent.get(__MODULE__, fn state ->
      if Map.has_key?(state, name) do
        Map.get(state, name)
      else
        Map.put(state, name, %{wins: 0, losses: 0})
        %{wins: 0, losses: 0}
      end
    end)
  end
end
