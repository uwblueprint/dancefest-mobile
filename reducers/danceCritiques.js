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
    notUplodaedDanceCritiques: [],
    isUploadingDanceCritique: false,
    uploadDanceCritiqueError: '',
  };
}

/**
 * Actions
 */

export const UPLOAD_DANCE_CRITIQUE_REQUEST = 'UPLOAD_DANCE_CRITIQUE_REQUEST';
export const UPLOAD_DANCE_CRITIQUE_SUCCESS = 'UPLOAD_DANCE_CRITIQUE_SUCCESS';
export const UPLOAD_DANCE_CRITIQUE_FAILURE = 'UPLOAD_DANCE_CRITIQUE_FAILURE';

// NOTE: this should only be called if state.notUploadedDanceCritiques is not empty
export function uploadDanceCritique(danceCritique) {
  // TODO: send to Google Sheet here
  // TODO: send to Google Drive here

  const danceId = danceCritique.danceId;

  return {
    types: [UPLOAD_DANCE_CRITIQUE_REQUEST, UPLOAD_DANCE_CRITIQUE_SUCCESS, UPLOAD_DANCE_CRITIQUE_FAILURE],
    errorMessage: 'Something went wrong, please try again.',
    danceId,
  };
}

/**
 * Reducer
 */

export default function danceCritiques (state = initialState(), action = {}) {
  switch (action.type) {
    case UPLOAD_DANCE_CRITIQUE_REQUEST:
      return {
        ...state,
        isUploadingDanceCritique: true,
        uploadDanceCritiqueError: '',
      }
    case UPLOAD_DANCE_CRITIQUE_SUCCESS:
      const danceId = action.danceId;
      const index = (state.notUploadedDanceCritiques).indexOf(danceId);

      return {
        ...state,
        isUploadingDanceCritique: false,
        uploadDanceCritiqueError: '',
        notUploadedDanceCritiques: deleteItemAtIndex(index)(state.notUploadedDanceCritiques),
        uploadedDanceCritiques: state.uploadedDanceCritiques.concat(danceId),
      }
    case UPLOAD_DANCE_CRITIQUE_FAILURE:
      return {
        ...state,
        isUploadingDanceCritique: false,
        uploadDanceCritiqueError: action.errorMessage,
      }
    default:
      return state;
  }
}
