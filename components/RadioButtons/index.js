import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableHighlight, View } from 'react-native';
import { StyleSheet } from 'react-native';

export default class RadioButtons extends React.Component {
  static propTypes = {
    buttonNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      chosenButton: -1,
    }
  }

  render() {
    return (
      <View style={style.buttonCollection}>
        {this.props.buttonNames.map((button, i) => (
          <TouchableHighlight
            key={i} 
            style={[style.button, this.state.chosenButton === i ? style.selectedButton : {}]}
            onPress={() => {
              this.setState({
                chosenButton: i,
              });
            }}
            underlayColor='#fff'>
              <Text style={this.state.chosenButton === i ? style.selectedText : {}}>{button}</Text>
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
  }
});
