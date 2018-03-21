import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableHighlight, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { normalize } from '../../util/Scale';

const Button = ({ action, color, onSubmit }) => {
  return (
    <TouchableHighlight
      style={getButtonStyle(color)}
      onPress={() => {onSubmit()}}
      underlayColor='#EB6284'>
        <Text style={style.text}>{action}</Text>
    </TouchableHighlight>
  )
}

Button.propTypes = {
  action: PropTypes.string,
  color: PropTypes.string,
}

function getButtonStyle(color) {
  return {
    backgroundColor: color,
    flex: 1,
    alignItems: 'center',
    padding: 20,
  }
}

const style = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: normalize(14),
  },
});

export default Button;
