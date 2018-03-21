import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import audioRecordings from './reducers/audioRecordings';
import danceCritiques from './reducers/danceCritiques';

const reducers = {
  danceCritiques,
  audioRecordings,
  form: formReducer
}

const rootReducer = combineReducers(reducers)
export default rootReducer;
