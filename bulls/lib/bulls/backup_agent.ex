defmodule Bulls.BackupAgent do
  use Agent

  def start_link(_arg) do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  def is_started(name) do
    Agent.get(__MODULE__, fn state -> Map.has_key?(state, name) end)
  end

  def put(name, val) do
    Agent.update(__MODULE__, fn state ->
      Map.put(state, name, val)
    end)
  end

  def get(name) do
    Agent.get(__MODULE__, fn state ->
      Map.get(state, name)
    end)
  end
end
