import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { StackNavigator } from 'react-navigation';

import DanceCritiqueForm from './components/DanceCritiqueForm'
import CritiqueSection from './components/CritiqueSection'
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
