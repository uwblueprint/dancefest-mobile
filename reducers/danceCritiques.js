/**
 * Helpers
 */

const deleteItemAtIndex = index => arr => [...arr.slice(0, index), ...arr.slice(index + 1)];

/**
 * Initial state
 */

export function initialState () {
  return {
    // TODO: these initial arrays should populate with values from past instance of app
    uploadedDanceCritiques: [],
    notUploadedDanceCritiques: [],
    uploadDanceCritiqueError: '',
    uploadDanceAudioRecordingError: '',
  };
}

/**
 * Upload Dance Critique
 */

export const UPLOAD_DANCE_CRITIQUE_SUCCESS = 'UPLOAD_DANCE_CRITIQUE_SUCCESS';
export const UPLOAD_DANCE_CRITIQUE_FAILURE = 'UPLOAD_DANCE_CRITIQUE_FAILURE';

// NOTE: this should only be called if state.notUploadedDanceCritiques is not
// empty
export function uploadDanceCritique(danceCritique, audioRecordingUri) {
  const danceId = danceCritique.danceId;
  let googleDriveErrorMessage, googleSheetsErrorMessage;

  // TODO: send to Google Sheet here -- takes danceCritique
  // TODO: send to Google Drive here -- takes audioRecordingUri
  // if an error is returned on any of the above, then set them on
  // googleDriveErrorMessage or googleSheetsErrorMessage

  if (googleDriveErrorMessage || googleSheetsErrorMessage) {
    return {
      type: UPLOAD_DANCE_CRITIQUE_FAILURE,
      googleDriveErrorMessage,
      googleSheetsErrorMessage,
    };
  }

  return {
    type: UPLOAD_DANCE_CRITIQUE_SUCCESS,
    danceId,
  };
}

/**
 * Reducer
 */

export default function danceCritiques (state = initialState(), action = {}) {
  switch (action.type) {
    case UPLOAD_DANCE_CRITIQUE_SUCCESS:
      const danceId = action.danceId;
      const index = (state.notUploadedDanceCritiques).indexOf(danceId);

      return {
        ...state,
        uploadDanceCritiqueError: '',
        uploadDanceAudioRecordingError: '',
        notUploadedDanceCritiques: deleteItemAtIndex(index)(state.notUploadedDanceCritiques),
        uploadedDanceCritiques: state.uploadedDanceCritiques.concat(danceId),
      }
    case UPLOAD_DANCE_CRITIQUE_FAILURE:
      return {
        ...state,
        uploadDanceCritiqueError: action.googleSheetsErrorMessage,
        uploadDanceAudioRecordingError: action.googleDriveErrorMessage,
      }
    default:
      return state;
  }
}
