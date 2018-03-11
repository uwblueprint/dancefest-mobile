import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';

/**
 * Component
 */

const TextField = ({ numberOfLines, input: { onChange, value } }) => {
  return (
    <View style={styles.textField}>
      <TextInput multiline={numberOfLines > 1}
                 numberOfLines={numberOfLines}
                 onChangeText={(text) => onChange(text)}
                 style={[styles.inputField, numberOfLines > 1 ? styles.largeInputField : {}]}
                 underlineColorAndroid={'transparent'}
                 value={value} />
    </View>
  );
}

TextField.propTypes = {
  numberOfLines: PropTypes.number,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }),
}

TextField.defaultProps = {
  numberOfLines: 1,
}

const styles = StyleSheet.create({
  textField: {
    alignSelf: 'stretch',
  },
  inputField: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'dashed',
    borderColor: 'lightgrey',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  largeInputField: {
    textAlignVertical: 'top',
    paddingVertical: 10,
  }
});

/**
 * Exports
 */

export default TextField;
