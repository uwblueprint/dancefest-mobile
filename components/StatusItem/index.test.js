import React from 'react';
import StatusItem from '..\\index';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<StatusItem danceNum={1209} danceStatus='Required internet connection' danceName='the boogie'/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<StatusItem danceNum={100} danceStatus='Uploaded' danceName='121'/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<StatusItem danceNum={1209} danceStatus='9' danceName='waveeeeee'/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<StatusItem danceNum={String} danceStatus='Uploaded' danceName='whoa'/>).toJSON();
  expect(rendered).toBeTruthy();
});
