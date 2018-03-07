import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Constants } from 'expo';
import PropTypes from 'prop-types';


class Icon extends Component {
  render() {
    if (this.props.danceStatus == 'Uploaded') {
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
        <Text style={style.danceNum}> # {this.props.danceNum} </Text>
        <Text style={style.danceName}> {this.props.danceName} </Text>
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
        <Icon danceStatus={this.props.danceStatus} />
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
    borderWidth: 1.5,
    borderColor: '#d6d7da',
  },
  danceNum: {
    alignItems: 'flex-start',
    fontSize: 15,
    fontWeight: '300',
  },
  icon: {
    height: 70,
    width: '100%',
  },
  danceName: {
    alignItems: 'flex-end',
    fontSize: 24,
  },
  information: {
    width: '75%',
    height: 'auto',
  },
});
