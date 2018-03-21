import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import StatusItemListView from './../StatusItemListView';
import Icon from './../Icon';


const StatusItemList = ({ statusItemData }) => {
  if (statusItemData && statusItemData.length > 0) {
    return (
      <View style={styles.full}>
        <StatusItemListView statusItemData={statusItemData} />
      </View>
    );
  }
  return (
    null
  );
};


export default class StatusItemPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toggle: true };
  }
  onPress = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={this.onPress} >
            <Icon name="Upload" height="50" width="50" fill="white" viewBox="0 0 30 30" />
          </TouchableOpacity>
        </View>
        <View style={this.state.toggle ? styles.openSidebar : styles.closedSidebar}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={this.onPress} >
            <Icon name="Close" height="50" width="50" fill="white" viewBox="0 0 30 30" />
          </TouchableOpacity>
          <StatusItemList statusItemData={this.props.statusItemData} />
        </View>
      </View>
    );
  }
}

StatusItemPanel.propTypes = {
  statusItemData: PropTypes.arrayOf(PropTypes.object),
};

StatusItemList.defaultProps = {
  statusItemData: [],
};

StatusItemList.propTypes = {
  statusItemData: PropTypes.arrayOf(PropTypes.object),
};

StatusItemPanel.defaultProps = {
  statusItemData: [],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '6.5%',
  },
  openSidebar: {
    flex: 1,
    width: '75%',
    marginRight: '25%',
    backgroundColor: 'black',
    left: 0,
    marginTop: '-16%',
  },
  closedSidebar: {
    flex: 1,
    width: '75%',
    marginRight: '25%',
    backgroundColor: 'black',
    left: -300,
    marginTop: '-16%',
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: 'black',
    paddingTop: 10,
    marginLeft: '78%',
    width: '25%',
  },
  uploadButton: {
    alignItems: 'flex-end',
    backgroundColor: 'black',
    paddingTop: '2%',
    marginRight: '75%',
    width: '20%',
  },
});
