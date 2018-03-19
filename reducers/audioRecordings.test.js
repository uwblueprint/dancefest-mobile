import audioRecordings, { SET_AUDIO_URI, initialState } from './audioRecordings';

describe('audioRecordings', () => {
  it('returns the initial state', () => {
    expect(audioRecordings(undefined, {})).toEqual(initialState());
  });

  it('handles SET_AUDIO_URI', () => {
    const uri = 'expected uri';
    const action = { type: SET_AUDIO_URI, uri: uri };

    const expected = expect.objectContaining({
      uri: uri,
    });

    expect(audioRecordings(undefined, action)).toEqual(expected);
  });
});
