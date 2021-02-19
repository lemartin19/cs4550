defmodule Bulls.GameManager do
  require Logger
  use GenServer

  alias Bulls.Handler
  alias Bulls.BackupAgent

  # Supervisor

  def setup do
    {:ok, _} = Registry.start_link(keys: :unique, name: GameManager.Registry)

    {:ok, _} =
      DynamicSupervisor.start_link(
        strategy: :one_for_one,
        name: GameManager.Sup
      )
  end

  def reg(name) do
    {:via, Registry, {GameManager.Registry, name}}
  end

  # Client

  def start(name) do
    spec = %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, [name]},
      restart: :permanent,
      type: :worker
    }

    DynamicSupervisor.start_child(GameManager.Sup, spec)
  end

  def start_link(name) do
    game = BackupAgent.get(name) || Handler.new()
    GenServer.start_link(__MODULE__, %{name: name, game: game}, name: reg(name))
  end

  def add_player(name, user_id, type) do
    GenServer.call(reg(name), {:add_player, user_id, type})
  end

  def mark_player_ready(name, user_id) do
    GenServer.call(reg(name), {:mark_player_ready, user_id})
  end

  def guess(name, user_id, guess) do
    GenServer.call(reg(name), {:guess, user_id, guess})
  end

  def reset(name) do
    GenServer.call(reg(name), :reset)
  end

  # Server

  def init(%{name: name, game: game}) do
    Process.send_after(self(), :time_pass, 1_000)
    {:ok, %{name: name, game: game}}
  end

  def handle_info(:time_pass, %{name: name, game: game}) do
    Process.send_after(self(), :time_pass, 1_000)
    game = Handler.one_second_passed(game)
    BackupAgent.put(name, game)
    BullsWeb.Endpoint.broadcast!("game:" <> name, "time_pass", game)
    {:noreply, %{name: name, game: game}}
  end

  def handle_call({:add_player, user_id, type}, _from, %{name: name, game: game}) do
    game = Handler.add_player(game, user_id, type)
    BackupAgent.put(name, game)
    view = Handler.view(game)
    {:reply, {:ok, view}, %{name: name, game: game}}
  end

  def handle_call({:mark_player_ready, user_id}, _from, %{name: name, game: game}) do
    game = Handler.mark_player_ready(game, user_id)
    BackupAgent.put(name, game)
    view = Handler.view(game)
    {:reply, {:ok, view}, %{name: name, game: game}}
  end

  def handle_call({:guess, user_id, guess}, _from, %{name: name, game: game}) do
    game = Handler.make_guess(game, user_id, guess)
    BackupAgent.put(name, game)
    view = Handler.view(game)
    {:reply, {:ok, view}, %{name: name, game: game}}
  end

  def handle_call(:reset, _from, %{name: name, game: _game}) do
    game = Handler.new()
    BackupAgent.put(name, game)
    view = Handler.view(game)
    {:reply, {:ok, view}, %{name: name, game: game}}
  end
end
