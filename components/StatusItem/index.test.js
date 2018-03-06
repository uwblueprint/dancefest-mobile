import React from 'react';
import StatusItem from '..\\index';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<StatusItem number={1209} status='Required internet connection'/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<StatusItem number={100} status='Uploaded'/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<StatusItem number={1209} status='9'/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<StatusItem number={String} status='Uploaded'/>).toJSON();
  expect(rendered).toBeTruthy();
});
