import React from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import _ from 'lodash';
import Icon from './../Icon';
import { FileSystem, Google, Audio } from 'expo';
import { setApiToken, uploadFile } from './../../services/UploadToDrive';

const micIcon = require('./../../assets/ic_mic_white_24dp_2x.png');
const redoIcon = require('./../../assets/ic_replay_black_24dp_1x.png');

export default class AudioRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      recordingDuration: 0,
      recording: null,
    };
    this.signIn();
  }

  async signIn() {
    setApiToken(await this.signInWithGoogleAsync());
  }

  async signInWithGoogleAsync() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '850019194932-bbvpl69rgoh9ui5npu2t78r8vc20rd0l.apps.googleusercontent.com',
        iosClientId: '850019194932-ipictala3md7jvj0d3jse88ed3h6cifa.apps.googleusercontent.com',
        scopes: ['https://www.googleapis.com/auth/drive.file'],
      });
  
      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return {cancelled: true};
      }
    } catch(e) {
      return {error: true};
    }
  }

  updateDuration(status) {
    this.setState({
      recordingDuration: status.durationMillis || 0,
    });
  }

  async toggleRecording() {
    let newRecording = null;
    let uri = '';

    try {
      // either create a new recording or use the one on the state
      let recording = null;
      if (!this.state.recording) {
        newRecording = new Audio.Recording();

        // set audio mode to allow recording
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });

        // audio file extension will be .m4a for iOS and Android
        const recordingOptions = _.merge(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY, {
          ios: {
            extension: '.m4a',
            outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_APPLELOSSLESS,
          },
        });

        newRecording.setOnRecordingStatusUpdate(status => this.updateDuration(status));
        newRecording.setProgressUpdateInterval(50);
        await newRecording.prepareToRecordAsync(recordingOptions);
        recording = newRecording;
      } else {
        recording = this.state.recording;
      }

      // pause or start/resume recording based on state
      if (this.state.isRecording) {
        await recording.pauseAsync();
      } else {
        await recording.startAsync();
      }
      uri = await recording.getURI();
    } catch (error) {
      console.log(error);
      return;
    }

    // only update state if everything ran successfully
    const stateUpdate = {
      isRecording: !this.state.isRecording,
    };
    if (newRecording) {
      stateUpdate.recording = newRecording;
    }
    if (uri) {
      // TODO:: save URI to store
    }
    this.setState(stateUpdate);
  }

  async stopRecordingAlert() {
    if (!this.state.recording) {
      return;
    }

    Alert.alert(
      'Warning',
      'This will erase your existing recording and you will have to re-record!',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'Erase Recording (cannot be undone)', onPress: () => this.stopRecording() },
      ],
      { cancelable: false },
    );
  }

  async stopRecording() {
    let uri = '';
    if (this.state.recording) {
      try {
        await this.state.recording.stopAndUnloadAsync();
        const uri = await this.state.recording.getURI();
        console.log(uri);
        this.state.recordingString = await FileSystem.readAsStringAsync(uri);
        uploadFile(uri, this.state.recordingString);
        const soundObject = await this.state.recording.createNewLoadedSound();
        await soundObject.sound.playAsync();
      } catch (error) {
        console.log(error);
        return;
      }

      if (uri) {
        // TODO:: save URI to store
      }
      this.setState({
        isRecording: false,
        recordingDuration: 0,
        recording: null,
      });
    }
  }

  render() {
    const { recordingDuration } = this.state;
    const hours = _.padStart(Math.floor(recordingDuration / 3600000), 2, '0');
    const minutes = _.padStart(Math.floor((recordingDuration % 3600000) / 60000), 2, '0');
    const seconds = _.padStart(Math.ceil((recordingDuration % 60000) / 1000), 2, '0');
    const fontFamily = Platform.OS === 'ios' ? 'Avenir' : 'Roboto';

    return (
      <View style={styles.audioRecorder}>
        <Icon name={'Microphone'} height="48" width="48" viewBox="0 0 24 24" fill="white" />
        <Text style={[styles.counter, { fontFamily }]}>{hours}:{minutes}:{seconds}</Text>
        <Text style={styles.subText}>{this.state.isRecording ? 'Recording' : ' '}</Text>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            onPress={async () => this.stopRecordingAlert()}>
            <Icon name={'Delete'} height="32" width="32" viewBox="0 0 24 24" fill="white" />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={async () => this.toggleRecording()}
            style={styles.recordButtonOutline}>
            <View style={this.state.isRecording ? styles.stopButton : styles.recordButton} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  audioRecorder: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  counter: {
    color: 'white',
    fontSize: 36,
    letterSpacing: 2,
    marginVertical: 8,
  },
  subText: {
    color: '#838383',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  recordButtonOutline: {
    width: 60,
    height: 60,
    marginLeft: 25,
    marginRight: 57,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF2464',
  },
  stopButton: {
    width: 30,
    height: 30,
    borderRadius: 3,
    backgroundColor: '#FF2464',
  },
  redoButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
