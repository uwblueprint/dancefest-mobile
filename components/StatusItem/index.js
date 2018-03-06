import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Constants } from 'expo';
import PropTypes from 'prop-types';


class Icon extends Component {
  render() {
    if (this.props.status == 'Uploaded') {
    pic=require('..\\icons\\checkmark.png')
  } else {
    pic=require('..\\icons\\exclamation.jpg')
  }
    return (
      <View style={{flex: 1}} >
        <Image source={pic} style= {style.icon} />
      </View>
    );
  }
}

class Information extends Component {
  render() {
    return (
      <View style={style.information}>
        <Text style={style.danceNum}> Dance1 {this.props.danceNum} </Text>
        <Text style={style.status}> {this.props.status} </Text>
      </View>
    );
  }
}

export default class StatusItem extends React.Component {
  static propTypes = {
    danceNum: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }
  render () {
    return (
      <View style={style.items}>
        <Icon status={this.props.status} />
        <Information danceNum={this.props.danceNum} status={this.props.status} />
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
    height: 70,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#d6d7da',
  },
  danceNum: {
    alignItems: 'flex-start',
    fontSize: 20,
    fontWeight: '300',
  },
  icon: {
    height: '100%',
    width: '100%',
  },
  status: {
    alignItems: 'flex-end',
    fontSize: 16,
  },
  information: {
    width: '75%',
  },
});
