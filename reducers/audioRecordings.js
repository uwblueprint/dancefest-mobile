/**
 * Initial state
 */

export function initialState () {
  return {
    currentAudioRecordingUri: '',
  };
}

/**
 * Actions
 */

export const SET_AUDIO_URI = 'SET_AUDIO_URI';

export function setAudioUri(uri) {
  return {
    type: SET_AUDIO_URI,
    uri
  };
}

/**
 * Reducer
 */

export default function audioRecordings (state = initialState(), action = {}) {
  switch (action.type) {
    case SET_AUDIO_URI:
      return {
        ...state,
        currentAudioRecordingUri: action.uri,
      };
    default:
      return state;
  }
}
