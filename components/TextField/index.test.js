import React from 'react';
import TextField from './index';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<TextField input={{ value: 'input', onChange: () => {}}}/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('renders with multiple lines without crashing', () => {
  const rendered = renderer.create(<TextField input={{ value: 'input', onChange: () => {}}} numberOfLines={8} />).toJSON();
  expect(rendered).toBeTruthy();
});

it('renders with 1 line set without crashing', () => {
  const rendered = renderer.create(<TextField input={{ value: 'input', onChange: () => {}}} numberOfLines={1} />).toJSON();
  expect(rendered).toBeTruthy();
});
