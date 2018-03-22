import { findIndex, find, map } from 'lodash/fp';
import { uploadCritiques as uploadCritiquesToGoogleSheets, token as googleApiToken } from '../services/GoogleSheets';
import { AsyncStorage } from 'react-native';

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
    uploadedDanceCritiques: [],
    notUploadedDanceCritiques: [],
  };
}

/**
 * Initialize Dance Critique
 */

export const INITIALIZE_DANCE_CRITIQUE = 'INITIALIZE_DANCE_CRITIQUE';

export async function initializeDanceCritique () {
  // Get the unique time and store that as the danceId
  let danceId = new Date().getTime().toString()

  const notUploadedCritiqueIds = await AsyncStorage.getAllKeys();
  const notUploadedCritiqueStrings = await AsyncStorage.multiGet(notUploadedCritiqueIds);
  const notUploadedCritiques = map(notUploadedCritiqueStrings, string => JSON.parse(string));

  return {
    type: INITIALIZE_DANCE_CRITIQUE,
    danceId,
    notUploadedCritiques,
  }
}

/**
 * Submit Dance Critique
 */

export const SUBMIT_DANCE_CRITIQUE_SUCCESS = 'SUBMIT_DANCE_CRITIQUE_SUCCESS';
export const SUBMIT_DANCE_CRITIQUE_FAILURE = 'SUBMIT_DANCE_CRITIQUE_FAILURE';

export async function submitDanceCritique (danceCritique, audioRecordingUri) {
  const { danceId, danceNumber, danceTitle } = danceCritique;
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

export async function uploadDanceCritique (danceId, audioRecordingUri) {
  let googleDriveErrorMessage = '';
  let googleSheetsErrorMessage = '';
  let danceNumber, danceTitle;

  if (danceId !== null) {
    try {
      const critiqueString = await AsyncStorage.getItem(danceId);
      const critique = JSON.parse(critiqueString);
      danceNumber = critique.danceNumber;
      danceTitle = critique.danceTitle;
      const { success, message: googleSheetsErrorMessage } = await uploadCritiquesToGoogleSheets([critique], googleApiToken);
      console.log('upload result: ', success, googleSheetsErrorMessage);
      if (success) {
        googleSheetsErrorMessage = '';
      }
    } catch (error) {
      googleSheetsErrorMessage = 'Error getting critique ' + danceId + ' from AsyncStorage: ' + error;
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
    console.log('removing from async storage!')
    await AsyncStorage.removeItem(danceId);
  } catch (error) {
    console.log('error removing ' + danceId + ' from async storage: ' + error);
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
        notUploadedDanceCritiques: action.notUploadedCritiques,
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
