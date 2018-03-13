import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Constants } from 'expo';
import PropTypes from 'prop-types';
import Icon from './../Icon';


class StatusItemIcon extends Component {
  static propTypes = {
    danceStatus: PropTypes.string.isRequired,
  }

  render() {
    if (this.props.danceStatus === 'Uploaded') {
      return (
        <Icon name="Checkmark" height="50" width="50" fill='grey' viewBox='0 0 30 30' />
      );
    } else if (this.props.danceStatus === 'Required internet connection') {
      return (
        <Icon name="Exclamation" height="50" width="50" fill='red' viewBox='0 0 30 30' />
      );
    } else if (this.props.danceStatus === 'Loading') {
      return (
        <Icon name = "Loop" height="50" width="50" fill='black' viewBox='0 0 30 30' />
      );
    }
  }
}

class Information extends Component {
  static propTypes = {
    danceNum: PropTypes.number.isRequired,
    danceName: PropTypes.string.isRequired,
  }

  render() {
    return (
      <View style={style.information}>
        <Text style={style.danceNum}>#{this.props.danceNum}</Text>
        <Text style={style.danceName}>{this.props.danceName}</Text>
      </View>
    );
  }
}

export default class StatusItem extends React.Component {
  static propTypes = {
    danceNum: PropTypes.number.isRequired,
    danceStatus: PropTypes.string.isRequired,
    danceName: PropTypes.string.isRequired,
  }

  render () {
    return (
      <View style={style.items}>
        <Information danceNum={this.props.danceNum} danceName={this.props.danceName} />
        <StatusItemIcon danceStatus={this.props.danceStatus} />
      </View>
    );
  }
}

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
    backgroundColor: 'white'
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
