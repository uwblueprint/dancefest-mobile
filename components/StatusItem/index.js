import React from 'react';
import { Alert, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from './../Icon';

const StatusItem = ({ danceNumber, danceTitle, uploadDanceCritiqueError, uploadDanceAudioRecordingError }) => {
  if (danceNumber===-1) {
    return (
      <View style={style.items}>
        <View style={style.information}>
          <Text style={style.danceNumberFiller}>#{danceNumber}</Text>
          <Text style={style.danceTitleFiller}>{danceTitle}</Text>
        </View>
        <Icon name="Checkmark" height="50" width="50" fill="black" viewBox="0 0 30 30" />
      </View>
    );
  }
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
          <Text style={style.danceNumber}>#{danceNumber}</Text>
          <Text style={style.danceTitle}>{danceTitle}</Text>
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
        <Text style={style.danceNumber}>#{danceNumber}</Text>
        <Text style={style.danceTitle}>{danceTitle}</Text>
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
  danceNumber: {
    alignItems: 'flex-start',
    fontSize: 18,
    fontWeight: '300',
    color: 'grey',
  },
  danceTitle: {
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
  },
  danceNumberFiller: {
    alignItems: 'flex-start',
    fontSize: 18,
    fontWeight: '300',
    color: 'black',
  },
  danceTitleFiller: {
    alignItems: 'flex-end',
    fontSize: 24,
    color: 'black',
  },
});

export default StatusItem;
