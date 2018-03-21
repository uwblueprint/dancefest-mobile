import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { StyleSheet, Text, View, AsyncStorage, Image } from 'react-native';
import { some, isEmpty } from 'lodash/fp';
import { getFormValues } from 'redux-form';

import RadioButtons from '../RadioButtons';
import AudioRecorder from '../AudioRecorder';
import Button from '../Button';
import CritiqueSection from '../CritiqueSection';
import TextField from '../TextField';
import Icon from '../Icon'
import { normalize } from '../../util/Scale';

import { submitDanceCritique } from '../../reducers/danceCritiques';

const CRITIQUE_SECTIONS = {
  welcome: 0,
  danceNumber: 1,
  danceTitle: 2,
  danceSchool: 3,
  danceChoreographer: 4,
  danceStyle: 5,
  technique: 6,
  spatialAwareness: 7,
  useOfMusicTextSilence: 8,
  communicationElements: 9,
  communication: 10,
  recording: 11,
  submission: 12,
}

const CRITIQUE_UPLOAD_INTERVAL = 1 * 60 * 1000;

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

  constructor(props) {
    super(props);

    this.state = {
      screen: 0,
    }
  }

  uploadCritiques() {

  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.uploadCritiques();
    }, CRITIQUE_UPLOAD_INTERVAL);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  onSubmit = () => {
    if (some(this.props)(isEmpty)) {
      console.log('yo you\'re missing some required fields');
      // TODO: handle error better
    } else {
      submitDanceCritique(this.props);
    }
  }

  navigateScreen = (screen) => {
    this.setState({
      screen: screen
    })
  }

  getWelcomeScreen() {
    return (
      <View style={styles.container}>
        <Image resizeMode="contain" style={{width: '100%', height: '100%'}} source={{uri: 'http://ontariosecondaryschooldancefest.ca/images/DanceFestlogo.png'}} />
      </View>
    )
  }

  getDanceNumberScreen() {
    return this.getDanceDetailsScreen('currentDanceNumber', 'Dance Number')
  }

  getDanceTitleScreen() {
    return this.getDanceDetailsScreen('currentDanceTitle', 'Title')
  }

  getDanceSchoolScreen() {
    return this.getDanceDetailsScreen('currentDanceSchool', 'School')
  }

  getDanceChoreographerScreen() {
    return this.getDanceDetailsScreen('currentDanceChoreographer', 'Choreographer')
  }

  getDanceDetailsScreen(name, title) {
    return(
      <View style={styles.container}>
        <Text style={styles.textFieldTitle}>{title}</Text>
        <Field name={name} component={TextField} />
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
      <View style={styles.container, {alignItems: 'center'}}>
        <View style={{paddingLeft: '15%'}}>
          <Icon name='Submission' height="200" width="200" fill='#EB6284' viewBox="0 0 30 30" />
        </View>
        <Text style={{color: 'white'}}>Successfully Uploaded!</Text>
      </View>
    )
  }

  getButtonText(state) {
    if (state === CRITIQUE_SECTIONS.welcome) {
      return 'Start >'
    } else if (state === CRITIQUE_SECTIONS.recording) {
      return 'Submit'
    } else {
      return 'Next'
    }
  }

  getNavigationButtons() {
    if (this.state.screen === CRITIQUE_SECTIONS.submission) {
      return(
        <View style={styles.button}>
          <Button
          action='Start Another Critique >'
          color='black'
          onSubmit={() => {}} />
        </View>
      )
    } else {
      return(
        <View style={styles.buttonContainer}>
        {this.state.screen !== CRITIQUE_SECTIONS.welcome ?
          (<View style={styles.button}>
            <Button
            action='Back'
            color='black'
            onSubmit={() => {this.navigateScreen(this.state.screen - 1)}} />
          </View>) :
          null
        }
          <View style={styles.button}>
            <Button
              action={this.getButtonText(this.state.screen)}
              color='black'
              onSubmit={() => {this.navigateScreen(this.state.screen + 1)}}
            />
          </View>
        </View>
      )
    }
  }


  getCritiqueSection() {
    if(this.state.screen === CRITIQUE_SECTIONS.welcome) {
      return this.getWelcomeScreen()
    } else if (this.state.screen === CRITIQUE_SECTIONS.danceNumber) {
      return this.getDanceNumberScreen()
    } else if (this.state.screen === CRITIQUE_SECTIONS.danceSchool) {
      return this.getDanceSchoolScreen()
    } else if (this.state.screen === CRITIQUE_SECTIONS.danceChoreographer) {
      return this.getDanceChoreographerScreen()
    } else if (this.state.screen === CRITIQUE_SECTIONS.danceTitle) {
      return this.getDanceTitleScreen()
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
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    padding: 10,
    alignSelf: 'stretch',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  textFieldTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 8,
    fontSize: normalize(20),
    paddingBottom: 5,
  },
  screenTitle: {
    textAlign: 'center',
    fontSize: normalize(30),
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
