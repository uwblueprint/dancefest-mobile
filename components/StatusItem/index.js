import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from './../Icon';

const DANCE_STATUS = {
  uploaded: 0,
  loading: 1,
  requireInternet: 2,
};

const StatusItem = ({ danceNum, danceName, danceStatus }) => {
  let iconName;
  let fillColor;
  if (danceStatus === DANCE_STATUS.uploaded) {
    iconName = 'Checkmark';
    fillColor = 'grey';
  } else if (danceStatus === DANCE_STATUS.loading) {
    iconName = 'Loop';
    fillColor = 'white';
  } else if (danceStatus === DANCE_STATUS.requireInternet) {
    iconName = 'Exclamation';
    fillColor = 'red';
  }
  return (
    <View style={style.items}>
      <View style={style.information}>
        <Text style={style.danceNum}>#{danceNum}</Text>
        <Text style={style.danceName}>{danceName}</Text>
      </View>
      <Icon name={iconName} height="50" width="50" fill={fillColor} viewBox="0 0 30 30" />
    </View>
  );
};


StatusItem.propTypes = {
  danceNum: PropTypes.number.isRequired,
  danceStatus: PropTypes.number.isRequired,
  danceName: PropTypes.string.isRequired,
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
});

export { StatusItem, DANCE_STATUS };
