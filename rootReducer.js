import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import audioRecordings from './reducers/audioRecordings'

const reducers = {
  audioRecordings,
  form: formReducer
}

const rootReducer = combineReducers(reducers)
export default rootReducer;
