import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableHighlight, View, StyleSheet } from 'react-native';

/**
 * Component
 */

const RadioButtons = ({ buttonNames, input: { onChange, value } }) => {
  const chosenIndex = buttonNames.indexOf(value);

  return (
    <View style={mergeButtons ? style.mergedButtonCollection: style.buttonCollection}>
      {buttonNames.map((button, i) => {
        var styleArray = [];
        if (mergeButtons) {
          styleArray.push(style.mergedButton);
          if (i == 0) {
            styleArray.push(style.leftMergedButton);
          } else if (i == buttonNames.length - 1) {
            styleArray.push(style.rightMergedButton);
          }
        } else {
          styleArray.push(style.button);
        }
        styleArray.push(chosenIndex === i ? style.selectedButton : {});

        return (
          <TouchableHighlight
            key={i}
            style={styleArray}
            onPress={() => onChange(button)}
            underlayColor='#fff'>
              <Text style={[style.text, chosenIndex === i ? style.selectedText : {}]}>{button}</Text>
          </TouchableHighlight>
        )
      })}
    </View>
  );
};

RadioButtons.propTypes = {
  buttonNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  mergeButtons: PropTypes.bool,
};

/**
 * Styles
 */

const style = StyleSheet.create({
  buttonCollection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mergedButtonCollection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    borderRadius: 5,
    borderColor: '#BBBBBB',
    borderWidth: 1,
    margin: 5,
    padding: 10,
  },
  mergedButton: {
    borderColor: '#BBBBBB',
    borderBottomWidth: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderTopWidth: 1,
    flex: 1,
    padding: 10,
  },
  leftMergedButton: {
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    borderLeftWidth: 1,
  },
  rightMergedButton: {
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    borderRightWidth: 1,
  },
  selectedButton: {
    borderColor: '#EB6284',
    backgroundColor: '#EB6284',
  },
  text: {
    textAlign: 'center',
  },
  selectedText: {
    color: '#fff',
  },
});

/**
 * Exports
 */

export default RadioButtons;
