/**
 * Helpers
 */

const deleteItemAtIndex = index => arr => [...arr.slice(0, index), ...arr.slice(index + 1)];

const replaceItemAtIndex = (index, item) => arr => [
  ...arr.slice(0, index),
  item,
  ...arr.slice(index + 1),
];

const getDanceCritiqueById = id => danceCritiques => (
  find(danceCritique => danceCritique.id === id)(danceCritiques)
);

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
    submitDanceCritiqueError: '',
    // TODO: these initial arrays should populate with values from past instance
    // of app (issue #59):
    uploadedDanceCritiques: [],
    notUploadedDanceCritiques: [],
  };
}

/**
 * Initialize Dance Critique
 */

export const INITIALIZE_DANCE_CRITIQUE = 'INITIALIZE_DANCE_CRITIQUE';

export function initializeDanceCritique () {
  // TODO: generate unique currentDanceId here (issue #62)

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
  const { id: danceId, danceNumber, danceTitle } = danceCritique;
  let submitDanceCritiqueError;

  try {
    AsyncStorage.setItem(danceId, JSON.stringify(danceCritique));
  } catch (error) {
    submitDanceCritiqueError = 'There has been an error in submitting your dance critique:' + error;
  }

  if (submitDanceCritiqueError) {
    return {
      type: SUBMIT_DANCE_CRITIQUE_FAILURE,
      danceId,
      danceNumber,
      danceTitle,
      submitDanceCritiqueError,
    }
  }

  return {
    type: SUBMIT_DANCE_CRITIQUE_SUCCESS,
    danceId,
    danceNumber,
    danceTitle,
  }
}

/**
 * Upload Dance Critique
 */

export const UPLOAD_DANCE_CRITIQUE_SUCCESS = 'UPLOAD_DANCE_CRITIQUE_SUCCESS';
export const UPLOAD_DANCE_CRITIQUE_FAILURE = 'UPLOAD_DANCE_CRITIQUE_FAILURE';

// TODO: create async process that calls uploadDanceCritique (issue #61)
// NOTE: this should only be called if state.notUploadedDanceCritiques is not empty
export function uploadDanceCritique (danceCritique, audioRecordingUri) {
  const danceId = danceCritique.danceId;
  let googleDriveErrorMessage, googleSheetsErrorMessage;

  // TODO: send to Google Sheet here -- takes danceCritique (issue #55)
  // TODO: send to Google Drive here -- takes audioRecordingUri (issue #40)
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
  let index, abridgedDanceCritique;

  switch (action.type) {
    case INITIALIZE_DANCE_CRITIQUE:
      return {
        ...state,
        currentDanceId: action.danceId,
      }
    case SUBMIT_DANCE_CRITIQUE_SUCCESS:
      abridgedDanceCritique = {
        id: action.danceId,
        danceNumber: action.danceNumber,
        danceTitle: action.danceTitle,
        uploadDanceCritiqueError: '',
        uploadDanceAudioRecordingError: '',
      };

      return {
        ...state,
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
        notUploadedDanceCritiques: state.notUploadedDanceCritiques.concat(abridgedDanceCritique),
      }
    case SUBMIT_DANCE_CRITIQUE_FAILURE:
      return {
        ...state,
        submitDanceCritiqueError: action.submitDanceCritiqueError,
      }
    case UPLOAD_DANCE_CRITIQUE_SUCCESS:
      index = (state.notUploadedDanceCritiques).indexOf(action.danceId);

      abridgedDanceCritique = {
        id: action.danceId,
        danceNumber: action.danceNumber,
        danceTitle: action.danceTitle,
      };

      return {
        ...state,
        notUploadedDanceCritiques: deleteItemAtIndex(index)(state.notUploadedDanceCritiques),
        uploadedDanceCritiques: state.uploadedDanceCritiques.concat(abridgedDanceCritique),
      }
    case UPLOAD_DANCE_CRITIQUE_FAILURE:
      const currentAbridgedDanceCritique = getDanceCritiqueById(action.danceId)(state.notUploadedDanceCritiques);
      index = (state.notUploadedDanceCritiques).indexOf(action.danceId);

      if (action.googleSheetsErrorMessage) {
        currentAbridgedDanceCritique['uploadDanceCritiqueError'] = action.googleSheetsErrorMessage;
      }

      if (action.googleDriveErrorMessage) {
        currentAbridgedDanceCritique['uploadDanceAudioRecordingError'] = action.googleDriveErrorMessage;
      }

      return {
        ...state,
        notUploadedDanceCritiques: replaceItemAtIndex(index)(state.notUploadedDanceCritiques),
      }
    default:
      return state;
  }
}
