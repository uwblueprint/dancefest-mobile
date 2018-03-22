import React from 'react';
import { connect } from 'react-redux';
import { Alert, Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import _ from 'lodash';
import { Audio, Permissions } from 'expo';
import Icon from './../Icon';
import { normalize } from '../../util/Scale';
import Button from '../Button';

import { setAudioUri } from '../../reducers/audioRecordings';

class AudioRecorderInner extends React.Component {
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

  componentWillUpdate(nextProps, nextState) {
    if (nextState.recordingDuration == this.state.recordingDuration) {
      return false;
    }
    return true;
  }

  async toggleRecording() {
    let newRecording = null;
    let uri = '';

    try {
      // either create a new recording or use the one on the state
      let recording = null;
      if (!this.state.recording) {
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
      this.props.dispatch(setAudioUri(uri));
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
      try {
        await this.state.recording.stopAndUnloadAsync();
        uri = await this.state.recording.getURI();
        console.log(uri);
      } catch (error) {
        console.log(error);
        return;
      }

      if (uri && !clear) {
        this.props.dispatch(setAudioUri(uri));
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
            onPress={async () => this.toggleRecording()}
            style={styles.recordButtonOutline}>
            <View style={this.state.isRecording ? styles.stopButton : styles.recordButton} />
          </TouchableHighlight>
        </View>
        <View style={styles.navButtonContainer}>
          <View style={styles.button}>
            <Button
            action='Back'
            color='black'
            onSubmit={() => {this.props.navigateScreen(6)}} />
          </View>
          <View style={styles.button}>
            <Button
              action={'Next'}
              color='black'
              onSubmit={async () => {
                this.stopRecording(false);
                this.props.navigateScreen(8);
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const AudioRecorder = connect()(AudioRecorderInner);

const styles = StyleSheet.create({
  audioRecorder: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    padding: 10,
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
    marginRight: normalize(57),
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
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
});

export default AudioRecorder;
