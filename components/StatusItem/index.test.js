import React from 'react';
import StatusItem from '..\\index';
import renderer from 'react-test-renderer';

it('Renders exclamation without crashing', () => {
  const rendered = renderer.create(<StatusItem danceNum={1209} danceStatus='Required internet connection' danceName='the boogie'/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('Renders checkmark without crashing', () => {
  const rendered = renderer.create(<StatusItem danceNum={101} danceStatus='Uploaded' danceName='string'/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('Renders loop without crashing', () => {
  const rendered = renderer.create(<StatusItem danceNum={1} danceStatus='Loading' danceName='fya'/>).toJSON();
  expect(rendered).toBeTruthy();
});
