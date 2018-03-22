import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import { StyleSheet, Text, View, AsyncStorage, Image } from 'react-native';
import { some, isEmpty, clone } from 'lodash/fp';
import { getFormValues } from 'redux-form';

import { StatusItemPanel, filler } from '../StatusItemPanel';
import RadioButtons from '../RadioButtons';
import Button from '../Button';
import AudioRecorder from '../AudioRecorder';
import CritiqueSection from '../CritiqueSection';
import TextField from '../TextField';
import Icon from '../Icon';
import { normalize } from '../../util/Scale';

import { initializeDanceCritique, submitDanceCritique, uploadDanceCritique } from '../../reducers/danceCritiques';

const CRITIQUE_SECTIONS = {
  welcome: 0,
  danceNumber: 1,
  danceTitle: 2,
  danceSchool: 3,
  danceChoreographer: 4,
  danceStyle: 5,
  danceLevel: 6,
  recording: 7,
  technique: 8,
  spatialAwareness: 9,
  useOfMusicTextSilence: 10,
  communicationElements: 11,
  communication: 12,
  submission: 13,
};

const CRITIQUE_UPLOAD_INTERVAL = 1 * 5 * 1000;

class DanceCritiqueFormInner extends React.Component {
  static propTypes = {
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
    audioRecordingUri: PropTypes.string.isRequired,
    notUploadedDanceCritiques: PropTypes.arrayOf(PropTypes.object).isRequired,
    uploadedDanceCritiques: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  static defaultProps = {
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
    audioRecordingUri: '',
    notUploadedDanceCritiques: [],
    uploadedDanceCritiques: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      screen: 0,
    };
  }

  async uploadDanceCritiquesAndRecording() {
    if (this.syncing) {
      return;
    }
    try {
      this.syncing = true;
      const curNotUploaded = clone(this.props.notUploadedDanceCritiques);
      console.log(this.props.uploadedDanceCritiques)
      console.log(this.props.notUploadedDanceCritiques)
      for (let critique of curNotUploaded) {
        let critiqueId, recordingUri;
        if (!critique.uploadDanceCritiqueError && !critique.uploadDanceAudioRecordingError) {
          critiqueId = critique.id;
          recordingUri = critique.audioRecordingUri;
        } else {
          critiqueId = critique.uploadDanceCritiqueError ? critique.id : null;
          recordingUri = critique.uploadDanceAudioRecordingError ? critique.audioRecordingUri : null;
        }
        console.log('dispatching: ', critiqueId, recordingUri);
        await this.props.onUploadDanceCritique(critiqueId, recordingUri);
      }
    } finally {
      this.syncing = false;
    }
  }

  componentDidMount() {
    this.timer = setInterval(async () => {
      console.log('attempting uploads');
      await this.uploadDanceCritiquesAndRecording();
    }, CRITIQUE_UPLOAD_INTERVAL);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  onSubmit = async () => {
    const danceCritique = {
      danceId: this.props.id,
      danceNumber: this.props.danceNumber,
      danceTitle: this.props.danceTitle,
      danceChoreographer: this.props.danceChoreographer,
      danceStyle: this.props.danceStyle,
      danceLevel: this.props.danceLevel,
      techniqueMark: this.props.techniqueMark,
      spatialAwarenessMark: this.props.spatialAwarenessMark,
      useOfMusicTextSilenceMark: this.props.useOfMusicTextSilenceMark,
      communicationElementsMark: this.props.communicationElementsMark,
      communicationMark: this.props.communicationMark,
    };

    // TODO:: do validation
    console.log('IN ON SUBMITTTT')
    console.log(danceCritique)
    //this.props.onSubmitDanceCritique(danceCritique, this.props.audioRecordingUri);
    await this.props.onSubmitDanceCritique(danceCritique, this.props.audioRecordingUri);
  }

  onStartNewDanceCritique = () => {
    this.props.onStartNewDanceCritique();
    this.navigateScreen(CRITIQUE_SECTIONS.welcome);
  }

  navigateScreen = (screen) => {
    this.setState({
      screen: screen
    });
  }

  getWelcomeScreen() {
    return (
      <View style={styles.container}>
        <Image resizeMode="contain" style={{width: '100%', height: '100%'}} source={{uri: 'http://ontariosecondaryschooldancefest.ca/images/DanceFestlogo.png'}} />
      </View>
    )
  }

  getDanceNumberScreen() {
    return this.getDanceDetailsScreen('currentDanceNumber', 'Dance Number', 'numeric')
  }

  getDanceTitleScreen() {
    return this.getDanceDetailsScreen('currentDanceTitle', 'Title')
  }

  getDanceSchoolScreen() {
    const schoolNames = ['BCI','CCC', 'CCH', 'CCI', 'CHC', 'CKS', 'CMB', 'DB', 'ECI', 'ETS', 'FJB', 'GAH', 'HNH', 'LAJ', 'LAD',  'MAC', 'NPD', 'PDA', 'SJV', 'STA', 'STJ', 'STV', 'TVA', 'WAP', 'WCI']
    return (
      <View style={styles.container}>
        <CritiqueSection
          critiqueInput={RadioButtons}
          critiqueInputProps={{buttonNames: schoolNames, mergeButtons: false}}
          name={'currentDanceSchool'}
          title={'School'}
        />
      </View>
    )
  }

  getDanceChoreographerScreen() {
    return this.getDanceDetailsScreen('currentDanceChoreographer', 'Choreographer')
  }

  getDanceDetailsScreen(name, title, keyboardType) {
    return(
      <View style={styles.container}>
        <Text style={styles.textFieldTitle}>{title}</Text>
        <Field name={name} component={TextField} props={{keyboardType: keyboardType}}/>
      </View>
    )
  }

  getCustomizedCritiqueSection(description, name, title) {
    return (
      <View style={styles.container}>
        <CritiqueSection
          critiqueInput={TextField}
          critiqueInputProps={{keyboardType: 'numeric'}}
          description={description}
          name={name}
          title={title}
        />
      </View>
    )
  }

  getCompLevelScreen() {
    const compLevels = ['Novice', 'PC1', 'PC2', 'C1', 'C2'];
    return (
      <View style={styles.container}>
        <CritiqueSection
          critiqueInput={RadioButtons}
          critiqueInputProps={{buttonNames: compLevels, mergeButtons: false}}
          name={'currentDanceLevel'}
          title={'Dance Level'}
        />
      </View>
    )
  }

  getDanceStyleScreen() {
    const danceStyles = ['Jazz', 'Lyrical', 'Ballet', 'Tap', 'Modern/Contemporary', 'Musical Theatre/LipSync', 'Musical Theatre/Live Vocals', 'Hip Hop', 'Cultural', 'Open/Fusion', 'CREATIVE COLLABORATION', 'Teacher Choreographed Dances']
    return (
      <View style={styles.container}>
        <CritiqueSection
          critiqueInput={RadioButtons}
          critiqueInputProps={{buttonNames: danceStyles, mergeButtons: false}}
          name={'currentDanceStyle'}
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
    return this.getCustomizedCritiqueSection('Dancers demonstrate focus during performance and cohesion within the group and/or with the audience.','currentCommunicationMark', 'Communication')
  }

  getRecordingScreen() {
    return(
      <View style={styles.container}>
        <AudioRecorder navigateScreen={this.navigateScreen} />
      </View>
    )
  }

  getSubmissionScreen() {
    return (
      <View style={styles.container, {alignItems: 'center'}}>
        <View style={{paddingLeft: '10%'}} >
          <Icon name='Submission' height="200" width="200" fill='#EB6284' viewBox="0 0 30 30" />
        </View>
        <Text style={{color: 'white', fontSize: 26, }}>Submitted Successfully!</Text>
        <Text style={{color: 'white', fontSize: 22, }}>Check Status In Sidebar</Text>
      </View>
    )
  }

  getButtonText(state) {
    if (state === CRITIQUE_SECTIONS.welcome) {
      return 'Start >'
    } else if (state === CRITIQUE_SECTIONS.communication) {
      return 'Submit'
    } else {
      return 'Next'
    }
  }

  startDanceCritiqueSection() {
    this.props.onInitialize()
  }

  async onNavButtonPress() {
    if (this.state.screen === CRITIQUE_SECTIONS.welcome) {
      this.startDanceCritiqueSection();
    } else if (this.state.screen === CRITIQUE_SECTIONS.communication) {
      await this.onSubmit();
    }
    this.navigateScreen(this.state.screen + 1);
  }

  getNavigationButtons() {
    if (this.state.screen === CRITIQUE_SECTIONS.submission) {
      return(
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
            action='Start Another Critique >'
            color='black'
            onSubmit={() => {
              this.onStartNewDanceCritique();
            }} />
          </View>
        </View>
      )
    } else if (this.state.screen === CRITIQUE_SECTIONS.recording) {
      return null;
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
              onSubmit={async () => this.onNavButtonPress()}
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
    } else if (this.state.screen === CRITIQUE_SECTIONS.danceLevel) {
      return this.getCompLevelScreen();
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
    console.disableYellowBox = true;
    return (
      <View style={styles.form}>

      <View style={styles.container}>
        {this.getCritiqueSection()}
        {this.getNavigationButtons()}
      </View>
      <View style={styles.panel}>
        <StatusItemPanel statusItemData={this.props.notUploadedDanceCritiques.concat(this.props.uploadedDanceCritiques.concat(filler))}/>
      </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
//    flexDirection: 'row',
  },
  panel: {
    position: 'absolute',

  },
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
    id: state.danceCritiques.currentDanceId,
    danceNumber: formValues.currentDanceNumber,
    danceTitle: formValues.currentDanceTitle,
    danceChoreographer: formValues.currentDanceChoreographer,
    danceStyle: formValues.currentDanceStyle,
    danceLevel: formValues.currentDanceLevel,
    techniqueMark: formValues.currentTechniqueMark,
    spatialAwarenessMark: formValues.currentSpatialAwarenessMark,
    useOfMusicTextSilenceMark: formValues.currentUseOfMusicTextSilenceMark,
    communicationElementsMark: formValues.currentCommunicationElementsMark,
    communicationMark: formValues.currentCommunicationMark,
    audioRecordingUri: state.audioRecordings.currentAudioRecordingUri,
    notUploadedDanceCritiques: state.danceCritiques.notUploadedDanceCritiques,
    uploadedDanceCritiques: state.danceCritiques.uploadedDanceCritiques,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onInitialize: () => {
      dispatch(initializeDanceCritique());
    },
    onSubmitDanceCritique: async (danceCritique, audioRecordingUri) => {
      dispatch(await submitDanceCritique(danceCritique, audioRecordingUri));
    },
    onStartNewDanceCritique: () => {
      dispatch(reset('danceCritique'));
    },
    onUploadDanceCritique: async (critiqueId, recordingUri) => {
      dispatch(await uploadDanceCritique(critiqueId, recordingUri));
    }
  }
};

const DanceCritiqueForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DanceCritiqueFormInner);

export default reduxForm({
  form: 'danceCritique',
  initialValues: DanceCritiqueFormInner.defaultProps
})(DanceCritiqueForm);
