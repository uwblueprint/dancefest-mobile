import React from 'react';
import { Alert, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from './../Icon';

const DANCE_STATUS = {
  uploaded: 0,
  loading: 1,
  requireInternet: 2,
};

const StatusItem = ({ danceNumber, danceTitle, uploadDanceCritiqueError, uploadDanceAudioRecordingError }) => {
  const showAlert = () => {
      Alert.alert(
        "Errors:",
         JSON.stringify(uploadDanceCritiqueError).replace('"', '').replace('"', '') + " " +
         JSON.stringify(uploadDanceAudioRecordingError).replace('"', '').replace('"', ''),
      )
   }
  let iconName;
  let fillColor;
  if ((uploadDanceCritiqueError === 'thisWasUploaded') && (uploadDanceAudioRecordingError === 'thisWasUploaded')) {
    iconName = 'Checkmark';
    fillColor = 'grey';
  } else if ((uploadDanceCritiqueError === '') && (uploadDanceAudioRecordingError === '')) {
    iconName = 'Exclamation';
    fillColor = 'grey';
  } else {
    iconName = 'Exclamation';
    fillColor = 'red';
    return (
      <View style={style.items}>
        <View style={style.information}>
          <Text style={style.danceNum}>#{danceNumber}</Text>
          <Text style={style.danceName}>{danceTitle}</Text>
        </View>
        <TouchableOpacity
          onPress={showAlert} >
        <Icon name={iconName} height="50" width="50" fill={fillColor} viewBox="0 0 30 30" />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={style.items}>
      <View style={style.information}>
        <Text style={style.danceNum}>#{danceNumber}</Text>
        <Text style={style.danceName}>{danceTitle}</Text>
        <Text style={style.danceName}>{uploadDanceCritiqueError}</Text>
      </View>
      <Icon name={iconName} height="50" width="50" fill={fillColor} viewBox="0 0 30 30" />
    </View>
  );
};


StatusItem.propTypes = {
  danceNumber: PropTypes.number.isRequired,
  danceTitle: PropTypes.string.isRequired,
  uploadDanceCritiqueError: PropTypes.string,
  uploadDanceAudioRecordingError: PropTypes.string,
};

StatusItem.defaultProps = {
  uploadDanceCritiqueError: 'thisWasUploaded',
  uploadDanceAudioRecordingError: 'thisWasUploaded',
};

const style = StyleSheet.create({
  items: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 'auto',
    backgroundColor: 'black',
  },
  danceNum: {
    alignItems: 'flex-start',
    fontSize: 18,
    fontWeight: '300',
    color: 'grey',
  },
  danceName: {
    alignItems: 'flex-end',
    fontSize: 24,
    color: 'white',
  },
  information: {
    width: '75%',
    height: 'auto',
  },
  square: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'yellow',
  }
});

export { StatusItem, DANCE_STATUS };
