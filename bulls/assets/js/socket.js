// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket,
// and connect at the socket path in "lib/web/endpoint.ex".
//
// Pass the token on params as below. Or remove it
// from the params if you are not using authentication.
import { Socket } from 'phoenix';

const socket = new Socket('/socket', { params: { token: '' } });
socket.connect();

// Now that you are connected, you can join channels with a topic:
let channel;

let state = {};
let callback = null;

const stateUpdate = (newState) => {
  state = newState;
  if (callback) {
    callback(state);
  }
};

export const joinChannel = (gameId, userId, requestCallback) => {
  channel = socket.channel(`game:${gameId}`, { userId });
  channel
    .join()
    .receive('ok', stateUpdate)
    .receive('error', (resp) => {
      console.log(`Unable to join game: ${gameId}`, resp);
    });

  callback = requestCallback;
  callback(state);
};

export const addPlayer = (playerType) => {
  channel
    .push('player-type', { playerType })
    .receive('ok', stateUpdate)
    .receive('error', (err) => {
      console.log('Unable to push player-type: ' + err);
    });
};

export const playerReady = () => {
  channel
    .push('player-ready', {})
    .receive('ok', stateUpdate)
    .receive('error', (err) => {
      console.log('Unable to push player-ready: ' + err);
    });
};

export const channelGuess = (guess) => {
  channel
    .push('guess', { guess })
    .receive('ok', stateUpdate)
    .receive('error', (err) => {
      console.log('Unable to push guess: ' + err);
    });
};

export const channelReset = () => {
  channel
    .push('reset', {})
    .receive('ok', stateUpdate)
    .receive('error', (err) => {
      console.log('Unable to push reset: ' + err);
    });
};

export const leaveChannel = () => {
  channel.leave();
  channel = undefined;
};

export default socket;
