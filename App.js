import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import DanceCritiqueForm from './danceCritiqueForm'
import rootReducer from './rootReducer.js'
const store = createStore(rootReducer)

export default class App extends React.Component {
  render() {
    return (
			<Provider store={store}>
				<View style={styles.container}>
	        <Text>DanceFest!</Text>
	      </View>
			</Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
