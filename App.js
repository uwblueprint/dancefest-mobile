import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import DanceCritiqueForm from './components/DanceCritiqueForm'
import rootReducer from './rootReducer.js'

const store = createStore(rootReducer)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <DanceCritiqueForm />
      </Provider>
    );
  }
}
