import React from 'react';
import TextField from './index';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<TextField />).toJSON();
  expect(rendered).toBeTruthy();
});

it('renders large without crashing', () => {
  const rendered = renderer.create(<TextField large={true} />).toJSON();
  expect(rendered).toBeTruthy();
});

it('renders titled without crashing', () => {
  const rendered = renderer.create(<TextField title='Test Title' />).toJSON();
  expect(rendered).toBeTruthy();
});

it('renders titled and large without crashing', () => {
    const rendered = renderer.create(<TextField title='Test Title' large={true} />).toJSON();
    expect(rendered).toBeTruthy();
});