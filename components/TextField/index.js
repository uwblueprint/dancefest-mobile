import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';

export default class TextField extends React.Component {
  static propTypes = {
    numberOfLines: PropTypes.number,
  };

  render() {
    return (
    <View style={styles.textField}>
      <TextInput underlineColorAndroid={'transparent'}
                 multiline={this.props.numberOfLines > 1}
                 numberOfLines={this.props.numberOfLines}
                 style={[styles.inputField, this.props.numberOfLines > 1 ? styles.largeInputField : {}]}/>
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
