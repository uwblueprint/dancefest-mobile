import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { StyleSheet, Text, View } from 'react-native';
import RadioButtons from '../RadioButtons';

class DanceCritiqueForm extends React.Component {
  static propTypes = {
    danceNumber: PropTypes.number.isRequired,
    techniqueMark: PropTypes.number.isRequired,
    spatialAwarenessMark: PropTypes.number.isRequired,
    useOfMusicTextSilenceMark: PropTypes.number.isRequired,
    communicationElementsMark: PropTypes.number.isRequired,
    communicationMark: PropTypes.number.isRequired,
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>DanceFest!</Text>
        <Field name="test1" component={RadioButtons} props={{ buttonNames: ['1', '2', '3', '4'], mergeButtons: true }} />
        <Field name="test2" component={RadioButtons} props={{ buttonNames: ['Jazz', 'Hip-Hop', 'Contemporary', 'Fusion'] }} />
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
