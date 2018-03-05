import React from 'react';
import RadioButton from './components/RadioButton'
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>DanceFest!</Text>
        <RadioButton buttonNames={['Hip Hop', 'Jazz', 'Lyrical', 'Modern/Contemporary', 'Ballet', 'Cultural']}/>
      </View>
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
