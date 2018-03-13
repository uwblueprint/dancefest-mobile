import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { StyleSheet, Text, View } from 'react-native';
import RadioButtons from '../RadioButtons';
import Button from '../Button';

class DanceCritiqueForm extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>DanceFest!</Text>
        <Field name="test1" component={RadioButtons} props={{ buttonNames: ['1', '2', '3', '4'], mergeButtons: true }} />
        <Field name="test2" component={RadioButtons} props={{ buttonNames: ['Jazz', 'Hip-Hop', 'Contemporary', 'Fusion'] }} />
				<Field name="test3" component={Button} props={{action:'Submit'}} />
      </View>
    );
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
