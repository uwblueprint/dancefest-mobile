import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { some, isEmpty } from 'lodash/fp';

import RadioButtons from '../RadioButtons';
import AudioRecorder from '../AudioRecorder';
import GoogleSheets from '../GoogleSheets';

class DanceCritiqueFormInner extends React.Component {
  static propTypes = {
    danceNumber: PropTypes.number.isRequired,
    techniqueMark: PropTypes.number.isRequired,
    spatialAwarenessMark: PropTypes.number.isRequired,
    useOfMusicTextSilenceMark: PropTypes.number.isRequired,
    communicationElementsMark: PropTypes.number.isRequired,
    communicationMark: PropTypes.number.isRequired,
  }

  static defaultProps = {
    danceNumber: null,
    techniqueMark: null,
    spatialAwarenessMark: null,
    useOfMusicTextSilenceMark: null,
    communicationElementsMark: null,
    communicationMark: null,
  }

  mapStateToProps = state => ({
    danceNumber: state.currentCritique.danceNumber,
    techniqueMark: state.currentCritique.techniqueMark,
    spatialAwarenessMark: state.currentCritique.spatialAwarenessMark,
    useOfMusicTextSilenceMark: state.currentCritique.useOfMusicTextSilenceMark,
    communicationElementsMark: state.currentCritique.communicationElementsMark,
    communicationMark: state.currentCritique.communicationMark,
  })

  onSubmit = () => {
    if (some(this.props)(isEmpty)) {
      console.log('yo you\'re missing some required fields');
      // TODO: handle error better
    } else {
      AsyncStorage.mergeItem(this.props.danceNumber, JSON.stringify(this.props));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <AudioRecorder />
        <GoogleSheets />
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

const DanceCritiqueForm = connect(
  DanceCritiqueFormInner.mapStateToProps,
)(DanceCritiqueFormInner);

export default reduxForm({
  form: 'danceCritique',
})(DanceCritiqueForm);
