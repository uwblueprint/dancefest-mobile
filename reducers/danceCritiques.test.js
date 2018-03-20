import danceCritiques, {
  initialState,
  UPLOAD_DANCE_CRITIQUE_SUCCESS,
  UPLOAD_DANCE_CRITIQUE_FAILURE,
} from './danceCritiques';

describe('danceCritiques', () => {
  it('returns the initial state', () => {
    expect(danceCritiques(undefined, {})).toEqual(initialState());
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
