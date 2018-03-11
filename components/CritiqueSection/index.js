import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Field } from 'redux-form';

const CritiqueSection = ({ component, description, name, props, title }) => (
  <View style={styles.fieldView}>
    <Text style={styles.titleText}>{title}</Text>
    <Text style={styles.descText}>{description}</Text>
    <Field name={name} component={component} props={props} />
  </View>
);

CritiqueSection.propTypes = {
  component: PropTypes.func.isRequired,
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  props: PropTypes.object,
  title: PropTypes.string.isRequired,
};

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

export default CritiqueSection;
