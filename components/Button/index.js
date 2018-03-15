import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableHighlight, View } from 'react-native';
import { StyleSheet } from 'react-native';

export default class Button extends React.Component {
  static propTypes = {
    action: PropTypes.string,
		color: PropTypes.string,
  }

	getButtonStyle() {
		return {
			backgroundColor: this.props.color,
			display: 'flex',
			justifyContent: 'center',
			margin:5,
			padding: 20,
		}
	}

  render() {
		const buttonStyle = this.getButtonStyle()
    return (
      <View style={style.buttonCollection}>
          <TouchableHighlight
						style={buttonStyle}
            onPress={() => {this.props.onSubmit}}
            underlayColor='#EB6284'>
              <Text style={style.text}>{this.props.action}</Text>
          </TouchableHighlight>
      </View>
    );
  }
}



const style = StyleSheet.create({
  text: {
    color: '#fff',
  },
});
