import React from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import _ from 'lodash';
import { Audio, Permissions } from 'expo';
import Icon from './../Icon';
import { normalize } from '../../util/Scale';

export default class AudioRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      recordingDuration: 0,
      recording: null,
    };
  }

  updateDuration(status) {
    this.setState({
      recordingDuration: status.durationMillis || 0,
    });
  }

  async checkForExistingRecording() {
    // if isRecording = false but there is recording instance on the state, this means
    // that we have completed a recording. To start another recording, the user must
    // first clear existing completed recording.
    if (!this.state.isRecording && this.state.recording) {
      Alert.alert(
        'Warning',
        'There is an existing recording! Recording will overwrite this existing recording.',
        [
          { text: 'Cancel', onPress: () => {}, style: 'cancel' },
          { text: 'Overwrite existing recording (cannot be undone)', onPress: () => {
            this.stopRecording(true);
            this.toggleRecording();
          } },
        ],
        { cancelable: false },
      );
    } else {
      this.toggleRecording();
    }
  }

  async toggleRecording() {
    let newRecording = null;
    let uri = '';

    try {
      // either create a new recording or use the one on the state
      let recording = null;
      if (!this.state.isRecording) {
        // get audio recording permission if needed
        const { status } = await Permissions.getAsync(Permissions.AUDIO_RECORDING);
        if (status !== 'granted') {
          let { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        }

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
        { text: 'Erase Recording (cannot be undone)', onPress: () => this.stopRecording(true) },
      ],
      { cancelable: false },
    );
  }

  async stopRecording(clear) {
    let uri = '';
    if (this.state.recording) {
      // if isRecording = false, then the current recording has already been unloaded so
      // we don't need to unload again or Expo will throw an error
      if (this.state.isRecording) {
        try {
          await this.state.recording.stopAndUnloadAsync();
          uri = await this.state.recording.getURI();
          console.log(uri);
        } catch (error) {
          console.log(error);
          return;
        }
      }

      if (uri && !clear) {
        // TODO:: save URI to store
      }

      const stateUpdate = {
        isRecording: false,
      }
      if (clear) {
        stateUpdate.recording = null;
        stateUpdate.recordingDuration = 0;
      }
      this.setState(stateUpdate);
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
        <Icon name={'Microphone'} height={normalize(48)} width={normalize(48)} viewBox="0 0 24 24" fill="white" />
        <Text style={[styles.counter, { fontFamily }]}>{hours}:{minutes}:{seconds}</Text>
        <Text style={styles.subText}>{this.state.isRecording ? 'Recording' : ' '}</Text>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            onPress={async () => this.stopRecordingAlert()}>
            <Icon name={'Delete'} height={normalize(32)} width={normalize(32)} viewBox="0 0 24 24" fill="white" />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={async () => this.checkForExistingRecording()}
            style={styles.recordButtonOutline}>
            <View style={this.state.isRecording ? styles.stopButton : styles.recordButton} />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={async () => this.stopRecording(false)}>
            <Text style={styles.doneText}>Done</Text>
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
    fontSize: normalize(36),
    letterSpacing: 2,
    marginVertical: 8,
  },
  subText: {
    color: '#838383',
    fontSize: normalize(14),
    marginBottom: 20,
  },
  doneText: {
    color: 'white',
    fontSize: normalize(14),
    marginBottom: 10,
    marginRight: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  recordButtonOutline: {
    width: normalize(60),
    height: normalize(60),
    marginLeft: normalize(25),
    marginRight: normalize(16),
    borderRadius: normalize(30),
    borderWidth: normalize(8),
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    width: normalize(45),
    height: normalize(45),
    borderRadius: normalize(22.5),
    backgroundColor: '#FF2464',
  },
  stopButton: {
    width: normalize(30),
    height: normalize(30),
    borderRadius: normalize(3),
    backgroundColor: '#FF2464',
  },
});
