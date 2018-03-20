/**
 * Helpers
 */

const deleteItemAtIndex = index => arr => [...arr.slice(0, index), ...arr.slice(index + 1)];

/**
 * Initial state
 */

export function initialState () {
  return {
    currentDanceId: '',
    currentDanceNumber: '',
    currentDanceTitle: '',
    currentDanceChoreographer: '',
    currentDanceStyle: '',
    currentDanceLevel: '',
    currentTechniqueMark: '',
    currentSpatialAwarenessMark: '',
    currentUseOfMusicTextSilenceMark: '',
    currentCommunicationElementsMark: '',
    currentCommunicationMark: '',
    // TODO: these initial arrays should populate with values from past instance of app:
    uploadedDanceCritiques: [],
    notUploadedDanceCritiques: [],
    uploadDanceCritiqueError: '',
    uploadDanceAudioRecordingError: '',
    submitDanceCritiqueError: '',
  };
}

/**
 * Initialize Dance Critique
 */

export const INITIALIZE_DANCE_CRITIQUE = 'INITIALIZE_DANCE_CRITIQUE';

export function initializeDanceCritique () {
  // TODO: generate unique currentDanceId here LOL

  return {
    type: INITIALIZE_DANCE_CRITIQUE,
    danceId,
  }
}

/**
 * Submit Dance Critique
 */

export const SUBMIT_DANCE_CRITIQUE_SUCCESS = 'SUBMIT_DANCE_CRITIQUE_SUCCESS';
export const SUBMIT_DANCE_CRITIQUE_FAILURE = 'SUBMIT_DANCE_CRITIQUE_FAILURE';

export function submitDanceCritique (danceCritique) {
  const danceId = danceCritique.id;
  let submitDanceCritiqueError;

  try {
    AsyncStorage.setItem(danceId, JSON.stringify(danceCritique));
  } catch (error) {
    submitDanceCritiqueError = 'There has been an error in submitting your dance critique:' + error;
  }

  if (submitDanceCritiqueError) {
    return {
      type: SUBMIT_DANCE_CRITIQUE_FAILURE,
      submitDanceCritiqueError,
    }
  }

  return {
    type: SUBMIT_DANCE_CRITIQUE_SUCCESS,
    danceId,
    audioRecordingUri,
  }
}

/**
 * Upload Dance Critique
 */

export const UPLOAD_DANCE_CRITIQUE_SUCCESS = 'UPLOAD_DANCE_CRITIQUE_SUCCESS';
export const UPLOAD_DANCE_CRITIQUE_FAILURE = 'UPLOAD_DANCE_CRITIQUE_FAILURE';

// NOTE: this should only be called if state.notUploadedDanceCritiques is not
// empty
export function uploadDanceCritique (danceCritique, audioRecordingUri) {
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
    case INITIALIZE_DANCE_CRITIQUE:
      return {
        ...state,
        currentDanceId: action.danceId,
      }
    case SUBMIT_DANCE_CRITIQUE_SUCCESS:
      return {
        ...state,
        currentDanceId: '',
        currentDanceNumber: '',
        currentTechniqueMark: '',
        currentSpatialAwarenessMark: '',
        currentUseOfMusicTextSilenceMark: '',
        currentCommunicationElementsMark: '',
        currentCommunicationMark: '',
        notUploadedDanceCritiques: state.notUploadedDanceCritiques.concat(action.danceId),
        submitDanceCritiqueError: '',
      }
    case SUBMIT_DANCE_CRITIQUE_FAILURE:
      return {
        ...state,
        submitDanceCritiqueError: action.submitDanceCritiqueError,
      }
    case UPLOAD_DANCE_CRITIQUE_SUCCESS:
      const index = (state.notUploadedDanceCritiques).indexOf(action.danceId);

      return {
        ...state,
        uploadDanceCritiqueError: '',
        uploadDanceAudioRecordingError: '',
        notUploadedDanceCritiques: deleteItemAtIndex(index)(state.notUploadedDanceCritiques),
        uploadedDanceCritiques: state.uploadedDanceCritiques.concat(action.danceId),
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
