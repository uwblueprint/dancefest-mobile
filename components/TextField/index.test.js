import React from 'react';
import TextField from './index';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<TextField />).toJSON();
  expect(rendered).toBeTruthy();
});
it('renders with multiple lines without crashing', () => {
  const rendered = renderer.create(<TextField numberOfLines={8} />).toJSON();
  expect(rendered).toBeTruthy();
});