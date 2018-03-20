import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { some, isEmpty } from 'lodash/fp';

import RadioButtons from '../RadioButtons';
import AudioRecorder from '../AudioRecorder';
import { submitDanceCritique } from '../../reducers/danceCritiques';

class DanceCritiqueFormInner extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    danceNumber: PropTypes.string.isRequired,
    danceTitle: PropTypes.string.isRequired,
    danceChoreographer: PropTypes.string.isRequired,
    danceStyle: PropTypes.string.isRequired,
    danceLevel: PropTypes.string.isRequired,
    techniqueMark: PropTypes.string.isRequired,
    spatialAwarenessMark: PropTypes.string.isRequired,
    useOfMusicTextSilenceMark: PropTypes.string.isRequired,
    communicationElementsMark: PropTypes.string.isRequired,
    communicationMark: PropTypes.string.isRequired,
  }

  static defaultProps = {
    id: '',
    danceNumber: '',
    danceTitle: '',
    danceChoreographer: '',
    danceStyle: '',
    danceLevel: '',
    techniqueMark: '',
    spatialAwarenessMark: '',
    useOfMusicTextSilenceMark: '',
    communicationElementsMark: '',
    communicationMark: '',
  }

  mapStateToProps = state => ({
    id: state.currentDanceId,
    danceNumber: state.currentDanceNumber,
    danceTitle: state.currentDanceTitle,
    danceChoreographer: state.currentDanceChoreographer,
    danceStyle: state.currentDanceStyle,
    danceLevel: state.currentDanceLevel,
    techniqueMark: state.currentTechniqueMark,
    spatialAwarenessMark: state.currentSpatialAwarenessMark,
    useOfMusicTextSilenceMark: state.currentUseOfMusicTextSilenceMark,
    communicationElementsMark: state.currentCommunicationElementsMark,
    communicationMark: state.currentCommunicationMark,
  })

  onSubmit = () => {
    if (some(this.props)(isEmpty)) {
      console.log('yo you\'re missing some required fields');
      // TODO: handle error better
    } else {
      submitDanceCritique(this.props);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <AudioRecorder />
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
