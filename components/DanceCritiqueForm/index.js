import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { some, isEmpty } from 'lodash/fp';

import RadioButtons from '../RadioButtons';
import Button from '../Button';
import CritiqueSection from '../CritiqueSection'

const CRITIQUE_SECTIONS = {
	'default': 0,
	'technique': 1,
	'spatialAwareness': 2,
	'communicationElements': 3,
	'communication': 4,
	'recording': 5,
	'submission': 6,
}

class DanceCritiqueFormInner extends React.Component {
  static propTypes = {
    danceNumber: PropTypes.number.isRequired,
    techniqueMark: PropTypes.number.isRequired,
    spatialAwarenessMark: PropTypes.number.isRequired,
    useOfMusicTextSilenceMark: PropTypes.number.isRequired,
    communicationElementsMark: PropTypes.number.isRequired,
    communicationMark: PropTypes.number.isRequired,
  }

  mapStateToProps = state => ({
    danceNumber: state.currentCritique.danceNumber,
    techniqueMark: state.currentCritique.techniqueMark,
    spatialAwarenessMark: state.currentCritique.spatialAwarenessMark,
    useOfMusicTextSilenceMark: state.currentCritique.useOfMusicTextSilenceMark,
    communicationElementsMark: state.currentCritique.communicationElementsMark,
    communicationMark: state.currentCritique.communicationMark,
  })

	constructor(props){
	   super(props);

	   this.state = {
	      screen: 0,
	   }
	}


  onSubmit = () => {
    if (some(this.props)(isEmpty)) {
      console.log('yo you\'re missing some required fields');
      // TODO: handle error better
    } else {
      AsyncStorage.mergeItem(this.props.danceNumber, JSON.stringify(this.props));
    }
  }

	navigateScreen = (screen) => {
		this.setState({
			screen: screen
		})
	}

	getDefaultScreen() {
		return (
			<View style={styles.container}>
				<Text>DanceFest!</Text>
				<Field name="test1" component={RadioButtons} props={{ buttonNames: ['1', '2', '3', '4'], mergeButtons: true }} />
				<Field name="test2" component={RadioButtons} props={{ buttonNames: ['Jazz', 'Hip-Hop', 'Contemporary', 'Fusion'] }} />
				<Field name="test3" component={Button} props={{action: 'NEXT', color: 'black', onSubmit: () => {this.navigateScreen(this.state.screen + 1)}}} />
		</View>
		)
	}

	getTechniqueScreen() {
		return (
			<View style={styles.container}>
				<CritiqueSection
					critiqueInput={RadioButtons}
					critiqueInputProps={{buttonNames: ['1', '2', '3'], mergeButtons: true}}
					description="Demonstrates ability to execute technical skills with a sense of discipline and purpose"
					name="technique"
					title="Technique"
				/>
			</View>
		)
	}


	getCritiqueSection() {
		if(this.state.screen === CRITIQUE_SECTIONS.default) {
			return this.getDefaultScreen()
		} else if (this.state.screen === CRITIQUE_SECTIONS.technique) {
			return this.getTechniqueScreen()
		} else if(this.state.screen === CRITIQUE_SECTIONS.spatialAwareness) {
			return this.getSpatialAwarenessScreen()
		} else if(this.state.screen === CRITIQUE_SECTIONS.communicationElements) {
			return this.getCommunicationElementsScreen()
		} else if(this.state.screen === CRITIQUE_SECTIONS.communication) {
			return this.getCommunicationScreen()
		} else if(this.state.screen === CRITIQUE_SECTIONS.recording) {
			return this.getRecordingScreen()
		} else if(this.state.screen === CRITIQUE_SECTIONS.submission) {
			return this.getSubmissionScreen()
		}
	}

  render() {
    return (
			<View>
				{this.getCritiqueSection()}
				<Button action='BACK' color='black' onSubmit={() => {this.navigateScreen(this.state.screen - 1)}} />
			</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const DanceCritiqueForm = connect(
  DanceCritiqueFormInner.mapStateToProps,
)(DanceCritiqueFormInner);

export default reduxForm({
  form: 'danceCritique',
})(DanceCritiqueForm);
