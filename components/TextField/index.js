import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInput } from 'react-native';
import { normalize } from '../../util/Scale';

/**
 * Component
 */

const TextField = ({ numberOfLines, input: { onChange, value } }) => (
  <View style={styles.textField}>
    <TextInput
      multiline={numberOfLines > 1}
      numberOfLines={numberOfLines}
      onChangeText={text => onChange(text)}
      style={[styles.inputField, numberOfLines > 1 ? styles.largeInputField : {}]}
      underlineColorAndroid="transparent"
      value={value} />
  </View>
);

TextField.propTypes = {
  numberOfLines: PropTypes.number,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
};

TextField.defaultProps = {
  numberOfLines: 1,
};

const styles = StyleSheet.create({
  textField: {
    alignSelf: 'stretch',
  },
  inputField: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'dashed',
    borderColor: 'lightgrey',
    color: 'white',
    fontSize: normalize(14),
  },
  largeInputField: {
    textAlignVertical: 'top',
  },
});

/**
 * Exports
 */

export default TextField;
