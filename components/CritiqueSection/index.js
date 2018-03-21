import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Field } from 'redux-form';
import { normalize } from '../../util/Scale';

const CritiqueSection = ({ critiqueInput, critiqueInputProps, description, name, title }) => (
  <View style={styles.fieldView}>
    <Text style={styles.titleText}>{title}</Text>
    <Text style={styles.descText}>{description}</Text>
    <Field name={name} component={critiqueInput} {...critiqueInputProps} />
  </View>
);

CritiqueSection.propTypes = {
  critiqueInput: PropTypes.func.isRequired,
  critiqueInputProps: PropTypes.object,
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  fieldView: {
    alignSelf: 'stretch',
  },
  titleText: {
    color: 'white',
    fontSize: normalize(24),
    fontWeight: 'bold',
    marginVertical: 8,
  },
  descText: {
    color: '#838383',
    marginBottom: 15,
    fontSize: normalize(14),
  },
});

export default CritiqueSection;
