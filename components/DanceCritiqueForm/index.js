import React from 'react'
import { reduxForm } from 'redux-form'
import { StyleSheet, Text, View } from 'react-native'
import AudioRecorder from '../AudioRecorder';

class DanceCritiqueForm extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <AudioRecorder />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default DanceCritiqueForm = reduxForm({
  form: 'danceCritique'
})(DanceCritiqueForm);
