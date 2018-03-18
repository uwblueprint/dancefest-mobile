import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { StatusItem } from './../StatusItem';


const StatusItemListView = ({ statusItemData }) => (
  <View style={styles.container}>
    <FlatList
      data={statusItemData}
      renderItem={({ item }) => (
        <StatusItem
          danceNum={item.danceNum}
          danceStatus={item.danceStatus}
          danceName={item.danceName} />)}
      keyExtractor={item => item.danceNum} />
  </View>
);

StatusItemListView.propTypes = {
  statusItemData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '6%',
    width: '75%',
    marginRight: '25%',
  },
});

export default StatusItemListView;
