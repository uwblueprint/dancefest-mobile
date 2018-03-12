import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import _ from 'lodash';
import { Audio } from 'expo';

const micIcon = require('./../../assets/ic_mic_white_24dp_2x.png');

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
    try {
      if (!this.state.recording) {
        const recording = new Audio.Recording();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });
        await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        this.setState({
          recording: recording,
        });
      }
      if (this.state.isRecording) {
        await this.state.recording.pauseAsync();
      } else {
        await this.state.recording.startAsync();
      }
    } catch (error) {
      console.log(error);
    }
    this.setState({
      isRecording: !this.state.isRecording,
    });
  }

  async stopRecording() {
    if (this.state.recording) {
      try {
        await this.state.recording.stopAndUnloadAsync();
        const uri = await this.state.recording.getURI();
        const soundObject = await this.state.recording.createNewLoadedSound();
        await soundObject['sound'].playAsync();
      } catch (error) {
        console.log(error);
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
        <TouchableHighlight
          onPress={async () => await this.toggleRecording()}
          style={styles.recordButtonOutline}>
          <View style={this.state.isRecording ? styles.stopButton : styles.recordButton} />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={async () => await this.stopRecording()}>
          <Text style={styles.subText}>Stop and Play recording</Text>
        </TouchableHighlight>
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
  recordButtonOutline: {
    width: 60,
    height: 60,
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
});
