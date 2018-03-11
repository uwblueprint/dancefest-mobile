import React from 'react'
import { reduxForm } from 'redux-form'
import { StyleSheet, Text, View } from 'react-native'

class DanceCritiqueForm extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>DanceFest!</Text>
          {/* form body*/}
      </View>
    )
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


export default DanceCritiqueForm = reduxForm({
  form: 'danceCritique'
})(DanceCritiqueForm);