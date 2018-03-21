import { findIndex, find } from 'lodash/fp';
import { uploadCritiques as uploadCritiquesToGoogleSheets } from '../services/GoogleSheets';

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

const getDanceCritiqueIndexById = id => findIndex(danceCritique => danceCritique.id === id);

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
  // Get the unique time and store that as the danceId
  let danceId = new Date().getTime().toString()
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

export async function submitDanceCritique (danceCritique, audioRecordingUri) {
  const { id: danceId, danceNumber, danceTitle } = danceCritique;
  let submitDanceCritiqueError;

  try {
    await AsyncStorage.setItem(danceId, JSON.stringify(danceCritique));
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
    danceNumber,
    danceTitle,
    audioRecordingUri,
  }
}

/**
 * Upload Dance Critique
 */

export const UPLOAD_DANCE_CRITIQUE_SUCCESS = 'UPLOAD_DANCE_CRITIQUE_SUCCESS';
export const UPLOAD_DANCE_CRITIQUE_FAILURE = 'UPLOAD_DANCE_CRITIQUE_FAILURE';

export async function uploadDanceCritique (danceCritiqueId, audioRecordingUri) {
  let googleDriveErrorMessage = '';
  let googleSheetsErrorMessage = '';

  if (danceCritiqueId !== null) {
    try {
      const critique = await AsyncStorage.getItem(danceCritiqueId);
      const { success, message: googleSheetsErrorMessage } = await uploadCritiquesToGoogleSheets([critique]);
      if (success) {
        googleSheetsErrorMessage = '';
      }
    } catch (error) {
      googleSheetsErrorMessage = 'Error getting critique ' + danceCritiqueId + ' from AsyncStorage!';
    }
  }
  if (audioRecordingUri !== null) {
    // TODO: send to Google Drive here -- takes audioRecordingUri (issue #40)
  }

  if (googleDriveErrorMessage || googleSheetsErrorMessage) {
    return {
      type: UPLOAD_DANCE_CRITIQUE_FAILURE,
      danceId,
      googleDriveErrorMessage,
      googleSheetsErrorMessage,
    };
  }

  try {
    await AsyncStorage.removeItem(danceCritiqueId);
  } catch (error) {
    // TODO:: handle this error properly. Right now if removing the item fails
    // then we just let the dance critique stay in the store
  }
  return {
    type: UPLOAD_DANCE_CRITIQUE_SUCCESS,
    danceId,
    danceNumber,
    danceTitle,
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
        audioRecordingUri: action.audioRecordingUri,
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
        submitDanceCritiqueError: '',
      }
    case SUBMIT_DANCE_CRITIQUE_FAILURE:
      return {
        ...state,
        submitDanceCritiqueError: action.submitDanceCritiqueError,
      }
    case UPLOAD_DANCE_CRITIQUE_SUCCESS:
      index = getDanceCritiqueIndexById(action.danceId)(state.notUploadedDanceCritiques);

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
      index = getDanceCritiqueIndexById(action.danceId)(state.notUploadedDanceCritiques);
      const currentAbridgedDanceCritique = state.notUploadedDanceCritiques[index];

      if (action.googleSheetsErrorMessage) {
        currentAbridgedDanceCritique['uploadDanceCritiqueError'] = action.googleSheetsErrorMessage;
      }

      if (action.googleDriveErrorMessage) {
        currentAbridgedDanceCritique['uploadDanceAudioRecordingError'] = action.googleDriveErrorMessage;
      }

      return {
        ...state,
        notUploadedDanceCritiques: replaceItemAtIndex(index, currentAbridgedDanceCritique)(state.notUploadedDanceCritiques),
      }
    default:
      return state;
  }
}
