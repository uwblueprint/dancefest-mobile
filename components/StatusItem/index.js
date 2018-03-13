import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from './../Icon';

const StatusItemIcon = ({ danceStatus }) => {
  if (danceStatus === 'Uploaded') {
    return (
      <Icon name="Checkmark" height="50" width="50" fill="grey" viewBox="0 0 30 30" />
    );
  } else if (danceStatus === 'Loading') {
    return (
      <Icon name="Loop" height="50" width="50" fill="black" viewBox="0 0 30 30" />
    );
  } else if (danceStatus === 'Required internet connection') {
    return (
      <Icon name="Exclamation" height="50" width="50" fill="red" viewBox="0 0 30 30" />
    );
  }
  return (null);
};

StatusItemIcon.propTypes = {
  danceStatus: PropTypes.string.isRequired,
};

const Information = ({ danceNum, danceName }) => (
  <View style={style.information}>
    <Text style={style.danceNum}>#{danceNum}</Text>
    <Text style={style.danceName}>{danceName}</Text>
  </View>
);


Information.propTypes = {
  danceNum: PropTypes.number.isRequired,
  danceName: PropTypes.string.isRequired,
};

const StatusItem = ({ danceNum, danceName, danceStatus }) => (
  <View style={style.items}>
    <Information danceNum={danceNum} danceName={danceName} />
    <StatusItemIcon danceStatus={danceStatus} />
  </View>
);


StatusItem.propTypes = {
  danceNum: PropTypes.number.isRequired,
  danceStatus: PropTypes.string.isRequired,
  danceName: PropTypes.string.isRequired,
};

const style = StyleSheet.create({
  items: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 'auto',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  danceNum: {
    alignItems: 'flex-start',
    fontSize: 18,
    fontWeight: '300',
    color: 'grey',
  },
  statusItemIcon: {
    backgroundColor: 'green',
    height: 70,
    width: '100%',
  },
  danceName: {
    alignItems: 'flex-end',
    fontSize: 24,
    color: 'black',
  },
  information: {
    width: '75%',
    height: 'auto',
  },
});

export default StatusItem;
