import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';

export default class TextField extends React.Component {
  static propTypes = {
    numberOfLines: PropTypes.number,
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired,
    }),
  };

  render() {
    const { input: { onChange, value }, numberOfLines } = this.props;
    return (
    <View style={styles.textField}>
      <TextInput multiline={numberOfLines > 1}
                 numberOfLines={numberOfLines}
                 onChangeText={(text) => onChange(text)}
                 style={[styles.inputField, numberOfLines > 1 ? styles.largeInputField : {}]}
                 underlineColorAndroid={'transparent'}
                 value={value}/>
    </View>
    );
  }
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
