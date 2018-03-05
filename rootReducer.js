import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const reducers = {
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer
}

const rootReducer = combineReducers(reducers)
export default rootReducer;
