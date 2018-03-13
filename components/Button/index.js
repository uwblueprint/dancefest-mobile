import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableHighlight, View } from 'react-native';
import { StyleSheet } from 'react-native';

export default class Button extends React.Component {
  static propTypes = {
    action: PropTypes.string,
  }

  render() {
    return (
      <View style={style.buttonCollection}>
          <TouchableHighlight
						style={style.button}
            onPress={() => {console.log('hi')}}
            underlayColor='#fff'>
              <Text>{this.props.action}</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

const style = StyleSheet.create({
  buttonCollection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
		backgroundColor: '#EB6284',
    borderRadius: 5,
    borderColor: '#BBBBBB',
    borderWidth: 1,
    margin: 5,
    padding: 10,
  },
  selectedButton: {
    borderColor: '#EB6284',
    backgroundColor: '#EB6284',
  },
  selectedText: {
    color: '#fff',
  },
});
