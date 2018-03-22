import React from 'react';
import StatusItem from './index';
import renderer from 'react-test-renderer';

it('Renders red exclamation with both errors without crashing', () => {
  const rendered = renderer.create(<StatusItem danceNumber={1209} danceTitle='the boogie' uploadDanceCritiqueError='Could not upload critique' uploadDanceAudioRecordingError='Could not upload recording'/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('Renders red exclamation with critique errors without crashing', () => {
  const rendered = renderer.create(<StatusItem danceNumber={1209} danceTitle='the boogie' uploadDanceCritiqueError='Could not upload critique' uploadDanceAudioRecordingError=''/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('Renders red exclamation with audio errors without crashing', () => {
  const rendered = renderer.create(<StatusItem danceNumber={1209} danceTitle='the boogie' uploadDanceCritiqueError='' uploadDanceAudioRecordingError='Could not upload recording'/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('Renders checkmark without crashing', () => {
  const rendered = renderer.create(<StatusItem danceNumber={101} danceTitle='string'/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('Renders grey exclamation without crashing', () => {
  const rendered = renderer.create(<StatusItem danceNumber={1} danceTitle='fya' uploadDanceCritiqueError='' uploadDanceAudioRecordingError=''/>).toJSON();
  expect(rendered).toBeTruthy();
});
