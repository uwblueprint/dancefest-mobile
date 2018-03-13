import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import _ from 'lodash';
import { Audio } from 'expo';

const micIcon = require('./../../assets/ic_mic_white_24dp_2x.png');
const redoIcon = require('./../../assets/ic_replay_black_24dp_1x.png');

export default class AudioRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      recordingDuration: 100000000,
      recording: null,
    };
  }

  async toggleRecording() {
    if (this.state.isRecording) {
      await this.stopRecording();
    } else {
      await this.startRecording();
    }
  }

  async startRecording() {
    let newRecording = null;

    try {
      // either create a new recording or use the one on the state
      let recording = null;
      if (!this.state.recording) {
        newRecording = new Audio.Recording();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });
        const recordingOptions = Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY;
        // recordingOptions.ios.extension = '.mp3';
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
    } catch (error) {
      console.log(error);
      return;
    }

    // only update state if everything ran successfully
    const stateUpdate = {
      isRecording: !this.state.isRecording,
    }
    if (newRecording) {
      stateUpdate.recording = newRecording;
    }
    this.setState(stateUpdate);
  }

  async stopRecording() {
    if (this.state.recording) {
      try {
        await this.state.recording.stopAndUnloadAsync();
        const uri = await this.state.recording.getURI();
        const soundObject = await this.state.recording.createNewLoadedSound();
        await soundObject.sound.playAsync();
      } catch (error) {
        console.log(error);
        return;
      }

      this.setState({
        isRecording: false,
        recording: null,
      });
    }
  }

  render() {
    const { recordingDuration } = this.state;
    const hours = _.padStart(Math.floor(recordingDuration / 3600000), 2, '0');
    const minutes = _.padStart(Math.floor((recordingDuration % 3600000) / 60000), 2, '0');
    const seconds = _.padStart((recordingDuration % 60000) / 1000, 2, '0');
    return (
      <View style={styles.audioRecorder}>
        <Image source={micIcon} />
        <Text style={styles.counter}>{hours}:{minutes}:{seconds}</Text>
        <Text style={styles.subText}>{this.state.isRecording ? 'Recording' : ' '}</Text>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            onPress={() => this.redo}
            style={styles.redoButton}>
            <Image source={redoIcon} />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={async () => await this.toggleRecording()}
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
