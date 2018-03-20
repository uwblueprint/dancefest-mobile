import danceCritiques, {
  initialState,
  INITIALIZE_DANCE_CRITIQUE,
  SUBMIT_DANCE_CRITIQUE_SUCCESS,
  SUBMIT_DANCE_CRITIQUE_FAILURE,
  UPLOAD_DANCE_CRITIQUE_SUCCESS,
  UPLOAD_DANCE_CRITIQUE_FAILURE,
} from './danceCritiques';

describe('danceCritiques', () => {
  it('returns the initial state', () => {
    expect(danceCritiques(undefined, {})).toEqual(initialState());
  });

  it('handles INITIALIZE_DANCE_CRITIQUE', () => {
    const danceId = 3;
    const action = { type: INITIALIZE_DANCE_CRITIQUE, danceId: danceId };

    const expected = expect.objectContaining({
      currentDanceId: danceId,
    });

    expect(danceCritiques(undefined, action)).toEqual(expected);
  });

  it('handles SUBMIT_DANCE_CRITIQUE_SUCCESS', () => {
    const danceId = 4;
    const action = { type: SUBMIT_DANCE_CRITIQUE_SUCCESS, danceId: danceId };

    const currentState = {
      notUploadedDanceCritiques: [2, 3],
    };

    const expected = expect.objectContaining({
      currentDanceId: '',
      currentDanceNumber: '',
      currentTechniqueMark: '',
      currentSpatialAwarenessMark: '',
      currentUseOfMusicTextSilenceMark: '',
      currentCommunicationElementsMark: '',
      currentCommunicationMark: '',
      notUploadedDanceCritiques: [2, 3, 4],
      submitDanceCritiqueError: '',
    });

    expect(danceCritiques(currentState, action)).toEqual(expected);
  });

  it('handles SUBMIT_DANCE_CRITIQUE_FAILURE', () => {
    const action = {
      type: SUBMIT_DANCE_CRITIQUE_FAILURE,
      submitDanceCritiqueError: 'There was an error',
    };

    const expected = expect.objectContaining({
      submitDanceCritiqueError: 'There was an error',
    });

    expect(danceCritiques(undefined, action)).toEqual(expected);
  });

  it('handles UPLOAD_DANCE_CRITIQUE_SUCCESS', () => {
    const danceId = 3;
    const action = { type: UPLOAD_DANCE_CRITIQUE_SUCCESS, danceId: danceId };

    const currentState = {
      notUploadedDanceCritiques: [3, 4, 5],
      uploadedDanceCritiques: [1, 2],
    };

    const expected = expect.objectContaining({
      uploadDanceCritiqueError: '',
      notUploadedDanceCritiques: [4, 5],
      uploadedDanceCritiques: [1, 2, 3],
    });

    expect(danceCritiques(currentState, action)).toEqual(expected);
  });

  it('handles UPLOAD_DANCE_CRITIQUE_FAILURE', () => {
    const action = {
      type: UPLOAD_DANCE_CRITIQUE_FAILURE,
      googleDriveErrorMessage: 'Something went wrong with uploading the audio.',
      googleSheetsErrorMessage: 'Something went wrong with uploading the critique.',
    };

    const expected = expect.objectContaining({
      uploadDanceAudioRecordingError: 'Something went wrong with uploading the audio.',
      uploadDanceCritiqueError: 'Something went wrong with uploading the critique.',
    });

    expect(danceCritiques(undefined, action)).toEqual(expected);
  });
});
