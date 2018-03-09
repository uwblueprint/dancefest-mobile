import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Field } from 'redux-form';

export default class CritiqueSection extends React.Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
    description: PropTypes.string,
    name: PropTypes.string.isRequired,
    props: PropTypes.object,
    title: PropTypes.string.isRequired,
  };

  render() {
    const { component, description, name,  props, title } = this.props;
    return (
    <View style={styles.fieldView}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.descText}>{description}</Text>
      <Field name={name} component={component} props={props} />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  fieldView: {
    alignSelf: 'stretch',
  },
  titleText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  descText: {
    color: '#838383',
    marginBottom: 15,
  },
});
