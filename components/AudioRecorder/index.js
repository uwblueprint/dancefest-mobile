import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import _ from 'lodash-fp';

const micIcon = require('./../../assets/ic_mic_white_24dp_2x.png');

export default class AudioRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      recordingDuration: 100000000,
    };
  }

  toggleRecording(value) {
    this.setState({
      isRecording: value,
    });
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
          onPress={() => this.toggleRecording(!this.state.isRecording)}
          style={styles.recordButtonOutline}>
          <View style={this.state.isRecording ? styles.stopButton : styles.recordButton} />
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
