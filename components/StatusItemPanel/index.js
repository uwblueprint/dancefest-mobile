import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, } from 'react-native';
import StatusItemListView  from './../StatusItemListView';
import Icon from './../Icon';
import PropTypes from 'prop-types';


export default class StatusItemPanel extends React.Component {

  constructor(props) {
      super(props);
      this.state = {toggle: false};
    }
  onPress = () => {
   this.setState({
     toggle: !this.state.toggle,
   })
 }
 render() {
    return (
      <View style={styles.container}>
      <View>
      <TouchableOpacity
         style={styles.uploadButton}
         onPress={this.onPress}
       >
       <Icon name='Upload' height="50" width="50" fill='white' viewBox="0 0 30 30" />
       </TouchableOpacity>
      </View>
        <View style={this.state.toggle ? styles.openSidebar : styles.closedSidebar}>
          <TouchableOpacity
             style={styles.closeButton}
             onPress={this.onPress}
           >
           <Icon name='Close' height="50" width="50" fill='white' viewBox="0 0 30 30" />
           </TouchableOpacity>
          <StatusItemListView statusItemData={this.props.statusItemData} />
        </View>
      </View>
    );
  }
}

StatusItemPanel.propTypes = {
  statusItemData: PropTypes.arrayOf(PropTypes.object),
};


const styles = StyleSheet.create({
  container: {
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
    paddingTop: '6.5%',
    width: '75%',
    marginRight: '25%',
    backgroundColor: 'black',
    left: -300,
    marginTop: '-16%',
  },
  closeButton: {
    alignItems: 'flex-end',
    backgroundColor: 'black',
    paddingTop: 10,
    marginLeft: '85%',
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
