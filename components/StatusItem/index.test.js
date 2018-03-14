import React from 'react';
import { StatusItem, DANCE_STATUS } from './index';
import renderer from 'react-test-renderer';

it('Renders exclamation without crashing', () => {
  const rendered = renderer.create(<StatusItem danceNum={1209} danceStatus={DANCE_STATUS.requireInternet} danceName='the boogie'/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('Renders checkmark without crashing', () => {
  const rendered = renderer.create(<StatusItem danceNum={101} danceStatus={DANCE_STATUS.uploaded} danceName='string'/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('Renders loop without crashing', () => {
  const rendered = renderer.create(<StatusItem danceNum={1} danceStatus={DANCE_STATUS.loading} danceName='fya'/>).toJSON();
  expect(rendered).toBeTruthy();
});
