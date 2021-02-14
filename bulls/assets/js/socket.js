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
let gameChannel;

let state = {};
let callback = null;

const stateUpdate = (newState) => {
  state = newState;
  if (callback) {
    callback(state);
  }
};

export const joinChannel = (gameId, userId, requestCallback) => {
  gameChannel = socket.channel(`game:${gameId}`, { ['user-id']: userId });
  gameChannel
    .join()
    .receive('ok', stateUpdate)
    .receive('error', (resp) => {
      console.log(`Unable to join game: ${gameId}`, resp);
    });

  callback = requestCallback;
  callback(state);
};

export const channelGuess = (guess) => {
  gameChannel
    .push('guess', { guess })
    .receive('ok', stateUpdate)
    .receive('error', (err) => {
      console.log('Unable to push: ' + err);
    });
};

export const channelReset = () => {
  gameChannel
    .push('reset', {})
    .receive('ok', stateUpdate)
    .receive('error', (err) => {
      console.log('Unable to push: ' + err);
    });
};

export const leaveChannel = () => {
  gameChannel.leave();
  gameChannel = undefined;
};

export default socket;
