import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import StatusItemListView from './../StatusItemListView';
import Icon from './../Icon';


const filler = [{ id: -1, danceNumber:-1, danceTitle:'Filler' }, { id: -2, danceNumber:-1, danceTitle:'Filler' },
                { id: -3, danceNumber:-1, danceTitle:'Filler' }, { id: -4, danceNumber:-1, danceTitle:'Filler' },
                { id: -5, danceNumber:-1, danceTitle:'Filler' }, { id: -6, danceNumber:-1, danceTitle:'Filler' },
                { id: -7, danceNumber:-1, danceTitle:'Filler' }, { id: -8, danceNumber:-1, danceTitle:'Filler' },
                { id: -9, danceNumber:-1, danceTitle:'Filler' }, { id: -10, danceNumber:-1, danceTitle:'Filler' },
                { id: -11, danceNumber:-1, danceTitle:'Filler' }, { id: -12, danceNumber:-1, danceTitle:'Filler' },
                { id: -13, danceNumber:-1, danceTitle:'Filler' }, { id: -14, danceNumber:-1, danceTitle:'Filler' },];


const StatusItemList = ({ statusItemData }) => {
  if (statusItemData && statusItemData.length > 0) {
    return (
        <StatusItemListView statusItemData={statusItemData} />
    );
  }
  return (
    null
  );
};


class StatusItemPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toggle: false };
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
            <Icon name="Upload" height="85" width="120" fill="white" viewBox="0 0 20 20" />
          </TouchableOpacity>
        </View>
        <View style={this.state.toggle ? styles.openSidebar : styles.closedSidebar}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={this.onPress} >
            <Icon name="Close" height="60" width="60" fill="white" viewBox="0 0 20 20" />
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
    width: '65%',
    marginRight: '35%',
    backgroundColor: 'black',
    left: 0,
    marginTop: '-16%',
    paddingTop: '6.5%',
  },
  closedSidebar: {
    flex: 1,
    width: '75%',
    marginRight: '25%',
    backgroundColor: 'black',
    left: -600,
    marginTop: '-16%',
    paddingTop: '6.5%',
  },
  closeButton: {
    alignItems: 'flex-end',
    backgroundColor: 'black',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: '74%',
    width: '25%',
  },
  uploadButton: {
    alignItems: 'center',
    backgroundColor: 'black',
    marginRight: '75%',
    width: '25%',
  },
});

export {StatusItemPanel, filler};
