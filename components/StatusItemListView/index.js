import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import StatusItem from './../StatusItem';


const StatusItemListView = ({ statusItemData }) => (
  <View style={styles.container}>
    <FlatList
      data={statusItemData}
      renderItem={({ item }) => (
        <StatusItem
          danceNumber={item.danceNumber}
          danceTitle={item.danceTitle}
          uploadDanceCritiqueError={item.uploadDanceCritiqueError}
          uploadDanceAudioRecordingError={item.uploadDanceAudioRecordingError}
           />)}
      keyExtractor={item => item.id} />
  </View>
);

StatusItemListView.propTypes = {
  statusItemData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
});

export default StatusItemListView;
