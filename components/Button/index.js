import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableHighlight, View } from 'react-native';
import { StyleSheet } from 'react-native';

const Button = ({ action, color, onSubmit }) => {
  return (
    <View>
        <TouchableHighlight
          style={getButtonStyle(color)}
          onPress={() => {onSubmit}}
          underlayColor='#EB6284'>
            <Text style={style.text}>{action}</Text>
        </TouchableHighlight>
    </View>
  )
}

Button.propTypes = {
  action: PropTypes.string,
  color: PropTypes.string,
}

function getButtonStyle(color) {
  return {
    backgroundColor: color,
    display: 'flex',
    justifyContent: 'center',
    margin:5,
    padding: 20,
  }
}

const style = StyleSheet.create({
  text: {
    color: '#fff',
  },
});

export default Button
