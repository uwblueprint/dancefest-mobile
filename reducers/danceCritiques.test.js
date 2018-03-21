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

});
