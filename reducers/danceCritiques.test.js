import danceCritiques, {
  initialState,
  UPLOAD_DANCE_CRITIQUE_REQUEST,
  UPLOAD_DANCE_CRITIQUE_SUCCESS,
  UPLOAD_DANCE_CRITIQUE_FAILURE,
} from './danceCritiques';

describe('danceCritiques', () => {
  it('returns the initial state', () => {
    expect(danceCritiques(undefined, {})).toEqual(initialState());
  });

  it('handles UPLOAD_DANCE_CRITIQUE_REQUEST', () => {
    const action = { type: UPLOAD_DANCE_CRITIQUE_REQUEST };

    const expected = expect.objectContaining({
      isUploadingDanceCritique: true,
      uploadDanceCritiqueError: '',
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
      isUploadingDanceCritique: false,
      uploadDanceCritiqueError: '',
      notUploadedDanceCritiques: [4, 5],
      uploadedDanceCritiques: [1, 2, 3],
    });

    expect(danceCritiques(currentState, action)).toEqual(expected);
  });

  it('handles UPLOAD_DANCE_CRITIQUE_FAILURE', () => {
    const action = { type: UPLOAD_DANCE_CRITIQUE_FAILURE, errorMessage: 'Something went wrong.' };

    const expected = expect.objectContaining({
      isUploadingDanceCritique: false,
      uploadDanceCritiqueError: 'Something went wrong.',
    });
  });
});
