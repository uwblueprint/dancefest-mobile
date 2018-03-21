import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { some, isEmpty } from 'lodash/fp';

import RadioButtons from '../RadioButtons';
import AudioRecorder from '../AudioRecorder';
import StatusItemPanel from '../StatusItemPanel';
import { DANCE_STATUS }  from '../StatusItem';

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
                                      { danceNum:103, danceStatus:DANCE_STATUS.requireInternet, danceName:'PrintTheBlue' },
                                      { danceNum:107, danceStatus:DANCE_STATUS.loading, danceName:'DancefestDab' },
                                      { danceNum:11, danceStatus:DANCE_STATUS.requireInternet, danceName:'The insanely super super long name that goes on forever' },
                                      { danceNum:1101, danceStatus:DANCE_STATUS.uploaded, danceName:'Plz review me' },
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
    backgroundColor: 'yellow'
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
