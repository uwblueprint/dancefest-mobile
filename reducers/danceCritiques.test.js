import danceCritiques, {
  initialState,
  INITIALIZE_DANCE_CRITIQUE,
  SUBMIT_DANCE_CRITIQUE_SUCCESS,
  SUBMIT_DANCE_CRITIQUE_FAILURE,
  UPLOAD_DANCE_CRITIQUE_SUCCESS,
  UPLOAD_DANCE_CRITIQUE_FAILURE,
} from './danceCritiques';

describe('danceCritiques', () => {
  const notUploadedDanceCritique1 = {
    id: 1,
    danceNumber: 1111,
    danceTitle: 'Litty Dance',
    uploadDanceCritiqueError: '',
    uploadDanceAudioRecordingError: '',
  };

  const notUploadedDanceCritique2 = {
    id: 2,
    danceNumber: 2222,
    danceTitle: 'Milly Rock',
    uploadDanceCritiqueError: '',
    uploadDanceAudioRecordingError: '',
  };

  const notUploadedDanceCritique3 = {
    id: 3,
    danceNumber: 3333,
    danceTitle: 'So Fire',
    uploadDanceCritiqueError: '',
    uploadDanceAudioRecordingError: '',
  };

  const failedUploadedDanceCritique = {
    id: 3,
    danceNumber: 3333,
    danceTitle: 'So Fire',
    uploadDanceCritiqueError: 'There was a dance critique error',
    uploadDanceAudioRecordingError: 'There was a dance audio recording error',
  };

  const nowUploadedDanceCritique = {
    id: 3,
    danceNumber: 3333,
    danceTitle: 'So Fire',
  };

  const uploadedDanceCritique1 = {
    id: 4,
    danceNumber: 4444,
    danceTitle: 'Juju on the beat',
  };

  const uploadedDanceCritique2 = {
    id: 5,
    danceNumber: 5555,
    danceTitle: 'Nae nae',
  };

  const uploadedDanceCritique3 = {
    id: 6,
    danceNumber: 6666,
    danceTitle: 'Dougie',
  };

  it('returns the initial state', () => {
    expect(danceCritiques(undefined, {})).toEqual(initialState());
  });

  it('handles INITIALIZE_DANCE_CRITIQUE', () => {
    const danceId = 3;
    const action = {
      type: INITIALIZE_DANCE_CRITIQUE,
      danceId: danceId,
      notUploadedCritiques: [1, 2, 3],
    };

    const expected = expect.objectContaining({
      currentDanceId: danceId,
      notUploadedDanceCritiques: [1, 2, 3],
    });

    expect(danceCritiques(undefined, action)).toEqual(expected);
  });

  it('handles SUBMIT_DANCE_CRITIQUE_SUCCESS', () => {
    const action = {
      type: SUBMIT_DANCE_CRITIQUE_SUCCESS,
      danceId: 3,
      danceNumber: 3333,
      danceTitle: 'So Fire',
    };

    const currentState = {
      notUploadedDanceCritiques: [notUploadedDanceCritique1, notUploadedDanceCritique2],
    };

    const newNotUploadedDanceCritiques = [notUploadedDanceCritique1, notUploadedDanceCritique2, notUploadedDanceCritique3];

    const expected = expect.objectContaining({
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
      notUploadedDanceCritiques: newNotUploadedDanceCritiques,
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
    const action = {
      type: UPLOAD_DANCE_CRITIQUE_SUCCESS,
      danceId: 3,
      danceNumber: 3333,
      danceTitle: 'So Fire',
    };

    const currentState = {
      notUploadedDanceCritiques: [notUploadedDanceCritique1, notUploadedDanceCritique2, notUploadedDanceCritique3],
      uploadedDanceCritiques: [uploadedDanceCritique1, uploadedDanceCritique2],
    };

    const expected = expect.objectContaining({
      notUploadedDanceCritiques: [notUploadedDanceCritique1, notUploadedDanceCritique2],
      uploadedDanceCritiques: [uploadedDanceCritique1, uploadedDanceCritique2, nowUploadedDanceCritique],
    });

    expect(danceCritiques(currentState, action)).toEqual(expected);
  });

  it('handles UPLOAD_DANCE_CRITIQUE_FAILURE', () => {
    const action = {
      type: UPLOAD_DANCE_CRITIQUE_FAILURE,
      danceId: 3,
      googleDriveErrorMessage: 'There was a dance audio recording error',
      googleSheetsErrorMessage: 'There was a dance critique error',
    };

    const currentState = {
      notUploadedDanceCritiques: [notUploadedDanceCritique1, notUploadedDanceCritique2, notUploadedDanceCritique3],
      uploadedDanceCritiques: [uploadedDanceCritique1, uploadedDanceCritique2],
    };

    const expected = expect.objectContaining({
      notUploadedDanceCritiques: [notUploadedDanceCritique1, notUploadedDanceCritique2, failedUploadedDanceCritique],
      uploadedDanceCritiques: [uploadedDanceCritique1, uploadedDanceCritique2],
    });

    expect(danceCritiques(currentState, action)).toEqual(expected);
  });
});
