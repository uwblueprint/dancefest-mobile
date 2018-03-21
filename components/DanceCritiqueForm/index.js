import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { StyleSheet, Text, View, AsyncStorage, ScrollView } from 'react-native';
import { some, isEmpty } from 'lodash/fp';
import { getFormValues } from 'redux-form'

import RadioButtons from '../RadioButtons';
import AudioRecorder from '../AudioRecorder';
import Button from '../Button';
import CritiqueSection from '../CritiqueSection'
import TextField from '../TextField'

const CRITIQUE_SECTIONS = {
  default: 0,
  danceStyle: 1,
  technique: 2,
  spatialAwareness: 3,
  useOfMusicTextSilence: 4,
  communicationElements: 5,
  communication: 6,
  recording: 7,
  submission: 8,
}

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

  constructor(props){
     super(props);

     this.state = {
        screen: 0,
     }
  }


  onSubmit = () => {
    if (some(this.props)(isEmpty)) {
      console.log('yo you\'re missing some required fields');
      // TODO: handle error better
    } else {
      AsyncStorage.mergeItem(this.props.danceNumber, JSON.stringify(this.props));
    }
  }

  navigateScreen = (screen) => {
    this.setState({
      screen: screen
    })
  }

  getDefaultScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.screenTitle}>Dance Details</Text>
        <View style={styles.section}>
          <Text style={styles.textFieldTitle}>Dance Number</Text>
          <Field name="currentDanceNumber" component={TextField} props={{value: 'Dance Id'}} />
        </View>
        <View style={styles.section}>
          <Text style={styles.textFieldTitle}>Dance Title</Text>
          <Field name="currentDanceTitle" component={TextField} props={{numberOfLines: 4, multiline: true}} />
        </View>
        <View style={styles.section}>
          <Text style={styles.textFieldTitle}>Choreograhper</Text>
          <Field name="danceChoreographer" component={TextField} props={{value: 'Choreographer'}} />
        </View>
        <View style={styles.section}>
          <Text style={styles.textFieldTitle}>School</Text>
          <Field name="danceSchool" component={TextField} props={{value: 'School'}} />
        </View>
    </View>
    )
  }

  getCustomizedCritiqueSection(description, name, title) {
    return (
      <View style={styles.container}>
        <CritiqueSection
          critiqueInput={RadioButtons}
          critiqueInputProps={{buttonNames: ['1', '2', '3'], mergeButtons: true}}
          description={description}
          name={name}
          title={title}
        />
      </View>
    )
  }

  getDanceStyleScreen() {
    const danceStyles = ['Jazz', 'Lyrical', 'Ballet','Modern/Contemporary', 'Musical Theatre/LipSync', 'Musical Theatre/Live Vocals', 'Hip Hop', 'Tap', 'Cultural', 'Open/Fusion', 'CREATIVE COLLABORATION', 'Teacher Choreographed Dances']
    return (
      <View style={styles.container}>
        <CritiqueSection
          critiqueInput={RadioButtons}
          critiqueInputProps={{buttonNames: danceStyles, mergeButtons: false}}
          name={'danceStyle'}
          title={'Dance Style'}
        />
      </View>
    )
  }

  getTechniqueScreen() {
    return this.getCustomizedCritiqueSection('Demonstrates ability to execute technical skills with a sense of discipline and purpose', 'currentTechniqueMark', 'Technique')
  }

  getSpatialAwarenessScreen() {
    return this.getCustomizedCritiqueSection('Demonstrates the ability to understand how the body occupies the aesthetic space, as well as creates meaning for the intended observer. (This could include the addition of props within the aesthetic space)','currentSpatialAwarenessMark', 'Spatial Awareness')
  }

  getUseOfMusicTextSilenceScreen() {
    return this.getCustomizedCritiqueSection('Demonstrates a use of rhythm, phrasing, and tempo effectively','currentUseOfMusicTextSilenceMark', 'Use of Music/Text/Silence')
  }

  getCommunicationElementsScreen() {
    return this.getCustomizedCritiqueSection('Demonstrates the ability to explore the elements of dance and movement ideas that connect to the selected dance style.','currentCommunicationElementsMark', 'Communication - Elements')
  }

  getCommunicationScreen() {
    return this.getCustomizedCritiqueSection('Demonstrates the ability to explore the elements of dance and movement ideas that connect to the selected dance style.','currentCommunicationMark', 'Communication')
  }

  getRecordingScreen() {
    return(
      <View style={styles.container}>
        <AudioRecorder />
      </View>
    )
  }

  getSubmissionScreen() {
    return (
      <Text style={styles.textFieldTitle}>Wooo Successfully Submitted!</Text>
    )
  }
  getNavigationButtons() {
    if(this.state.screen === CRITIQUE_SECTIONS.submission) {
      return (
        <View style={styles.button}>
          <Button action='SUBMIT' color='black' onSubmit={this.onSubmit()} />
        </View>
      )
    } else {
      return(
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button action='BACK' color='black' onSubmit={() => {this.navigateScreen(this.state.screen - 1)}} />
          </View>
          <View style={styles.button}>
            <Button action='NEXT' color='black' onSubmit={() => {this.navigateScreen(this.state.screen + 1)}} />
          </View>
        </View>
      )
    }
  }


  getCritiqueSection() {
    if(this.state.screen === CRITIQUE_SECTIONS.default) {
      return this.getDefaultScreen()
    } else if (this.state.screen === CRITIQUE_SECTIONS.danceStyle) {
      return this.getDanceStyleScreen()
    } else if (this.state.screen === CRITIQUE_SECTIONS.technique) {
      return this.getTechniqueScreen()
    } else if(this.state.screen === CRITIQUE_SECTIONS.spatialAwareness) {
      return this.getSpatialAwarenessScreen()
    } else if(this.state.screen === CRITIQUE_SECTIONS.useOfMusicTextSilence) {
      return this.getUseOfMusicTextSilenceScreen()
    } else if(this.state.screen === CRITIQUE_SECTIONS.communicationElements) {
      return this.getCommunicationElementsScreen()
    } else if(this.state.screen === CRITIQUE_SECTIONS.communication) {
      return this.getCommunicationScreen()
    } else if(this.state.screen === CRITIQUE_SECTIONS.recording) {
      return this.getRecordingScreen()
    } else if(this.state.screen === CRITIQUE_SECTIONS.submission) {
      return this.getSubmissionScreen()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.getCritiqueSection()}
        {this.getNavigationButtons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    padding: 10,
    alignSelf: 'stretch'
  },
  section: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#000',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom:0,
    left:0,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textFieldTitle: {
    color: 'white',
    fontSize: 20,
    paddingBottom: 5,

  },
  screenTitle: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    paddingVertical: 20,
  },
});

const mapStateToProps = state => {
  const formValues = getFormValues('danceCritique')(state)
  return {
    danceNumber: formValues.currentDanceNumber,
    techniqueMark: formValues.currentTechniqueMark,
    spatialAwarenessMark: formValues.currentSpatialAwarenessMark,
    useOfMusicTextSilenceMark: formValues.currentUseOfMusicTextSilenceMark,
    communicationElementsMark: formValues.currentCommunicationElementsMark,
    communicationMark: formValues.currentCommunicationMark,
  }
}

const DanceCritiqueForm = connect(
  mapStateToProps
)(DanceCritiqueFormInner);

export default reduxForm({
  form: 'danceCritique',
  initialValues: DanceCritiqueFormInner.defaultProps
})(DanceCritiqueForm);
