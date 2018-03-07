import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableHighlight, View } from 'react-native';
import { StyleSheet } from 'react-native';

export default class RadioButtons extends React.Component {
  static propTypes = {
    buttonNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired,
    }),
  }

  render() {
    const { buttonNames, input: { onChange, value } } = this.props;
    const chosenIndex = buttonNames.indexOf(value);

    return (
      <View style={style.buttonCollection}>
        {buttonNames.map((button, i) => (
          <TouchableHighlight
            key={i} 
            style={[style.button, chosenIndex === i ? style.selectedButton : {}]}
            onPress={onChange(button)}
            underlayColor='#fff'>
              <Text style={chosenIndex === i ? style.selectedText : {}}>{button}</Text>
          </TouchableHighlight>
        ))}
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
