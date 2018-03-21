import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { some, isEmpty } from 'lodash/fp';

import RadioButtons from '../RadioButtons';
import AudioRecorder from '../AudioRecorder';
import StatusItemPanel from '../StatusItemPanel';

class DanceCritiqueFormInner extends React.Component {
  static propTypes = {
    danceNumber: PropTypes.string.isRequired,
    techniqueMark: PropTypes.string.isRequired,
    spatialAwarenessMark: PropTypes.string.isRequired,
    useOfMusicTextSilenceMark: PropTypes.string.isRequired,
    communicationElementsMark: PropTypes.string.isRequired,
    communicationMark: PropTypes.string.isRequired,
  }

  static defaultProps = {
    danceNumber: '',
    techniqueMark: '',
    spatialAwarenessMark: '',
    useOfMusicTextSilenceMark: '',
    communicationElementsMark: '',
    communicationMark: '',
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
    <View style={styles.form}>

      <View style={styles.container}>
        <AudioRecorder />
        <Text>DanceFest!</Text>
        <Field name="test1" component={RadioButtons} props={{ buttonNames: ['1', '2', '3', '4'], mergeButtons: true }} />
        <Field name="test2" component={RadioButtons} props={{ buttonNames: ['Jazz', 'Hip-Hop', 'Contemporary', 'Fusion'] }} />
      </View>

      <View style={styles.panel}>
      <StatusItemPanel statusItemData={[
                                      { id: 1, danceNumber:103, danceTitle:'PrintTheBlue', uploadDanceCritiqueError:'', uploadDanceAudioRecordingError:'' },
                                      { id: 2, danceNumber:107, danceTitle:'DancefestDab', uploadDanceCritiqueError:'Could not upload the critique', uploadDanceAudioRecordingError:'Recording was invalid'},
                                      { id: 3, danceNumber:11, danceTitle:'The insanely super super long name that goes on forever', uploadDanceCritiqueError:'', uploadDanceAudioRecordingError:'Could not upload recording' },
                                      { id: 4, danceNumber:1101, danceTitle:'Plz review me' },
                      ]}/>
      </View>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  panel: {
    position: 'absolute',
  },
  form: {
    flex: 1,
  },
});

const DanceCritiqueForm = connect(
  DanceCritiqueFormInner.mapStateToProps,
)(DanceCritiqueFormInner);

export default reduxForm({
  form: 'danceCritique',
})(DanceCritiqueForm);
