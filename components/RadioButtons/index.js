import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { normalize } from '../../util/Scale';

/**
 * Component
 */

const RadioButtons = ({ buttonNames, input: { onChange, value }, mergeButtons }) => {
  const chosenIndex = buttonNames.indexOf(value);

  return (
    <View style={mergeButtons ? style.mergedButtonCollection : style.buttonCollection}>
      {buttonNames.map((button, i) => {
        const styleArray = [];
        if (mergeButtons) {
          styleArray.push(style.mergedButton);
          if (i === 0) {
            styleArray.push(style.leftMergedButton);
          } else if (i === buttonNames.length - 1) {
            styleArray.push(style.rightMergedButton);
          }
        } else {
          styleArray.push(style.button);
        }
        styleArray.push(chosenIndex === i ? style.selectedButton : {});

        return (
          <TouchableOpacity
            key={i}
            style={styleArray}
            onPress={() => onChange(button)}
            activeOpacity={0.9}>
            <Text style={[style.text, chosenIndex === i ? style.selectedText : {}]}>
              {button}
            </Text>
          </TouchableOpacity>
        );
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

RadioButtons.defaultProps = {
  mergeButtons: false,
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
    borderRadius: normalize(5),
    borderColor: '#BBBBBB',
    borderWidth: 1,
    margin: 5,
    padding: 15,
    backgroundColor: '#fff',
  },
  mergedButton: {
    borderColor: '#DDDDDD',
    borderBottomWidth: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderTopWidth: 1,
    flex: 1,
    padding: 14,
    backgroundColor: '#fff',
  },
  leftMergedButton: {
    borderTopLeftRadius: normalize(6),
    borderBottomLeftRadius: normalize(6),
    borderLeftWidth: 1,
  },
  rightMergedButton: {
    borderTopRightRadius: normalize(6),
    borderBottomRightRadius: normalize(6),
    borderRightWidth: 1,
  },
  selectedButton: {
    borderColor: '#EB6284',
    backgroundColor: '#EB6284',
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: normalize(16),
  },
  selectedText: {
    color: '#fff',
  },
});

/**
 * Exports
 */

export default RadioButtons;
