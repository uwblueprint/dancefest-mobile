import React from 'react';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';

export class TextField extends React.Component {
  render() {
    return (
    <View style={styles.textField}>
      <Text style={styles.titleText}>{this.props.title}</Text>
      <TextInput underlineColorAndroid={'transparent'}
                 multiline={this.props.large}
                 numberOfLines={this.props.large ? 8 : 1}
                 style={[styles.inputField, this.props.large ? styles.largeInputField : {}]}/>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  textField: {
    alignSelf: 'stretch',
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 15,
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