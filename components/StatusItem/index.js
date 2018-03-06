import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Constants } from 'expo';
import PropTypes from 'prop-types';


class Icon extends Component {
  render() {
    if (this.props.status == 'uploaded') {
    pic = {
      uri: 'https://emojipedia-us.s3.amazonaws.com/thumbs/160/facebook/105/heavy-check-mark_2714.png'
    };
  } else {
    pic = {
      uri: 'http://bizbuzzcreative.com/wp-content/uploads/2016/05/Exclamation-Point.jpg'
    };
  }
    return (
      <View style={{flex: 1}} >
        <Image source={pic} style= {style.icon}/>
      </View>
    );
  }
}

class Information extends Component {
  render() {
    return (
      <View style = {style.information}>
        <Text style = {style.danceNum}> Dance {this.props.number} </Text>
        <Text style = {style.status}> {this.props.status} </Text>
      </View>
    );
  }
}

export default class StatusItem extends React.Component{
  render (){
    return (
      <View style = {style.items}>
        <Icon status={this.props.status}/>
        <Information number={this.props.number} status={this.props.status}/>
      </View>
    );
  }
}

StatusItem.propTypes = {
  number: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired
};

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
    fontWeight: '300'
  },
  icon: {
    flex: 1
  },
  status: {
    alignItems: 'flex-end',
    fontSize: 16
  },
  information: {
    width: '75%'
  },
});
