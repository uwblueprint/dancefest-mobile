import React from 'react';
import RadioButtons from './index';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<RadioButtons buttonNames={['a', 'b']}/>).toJSON();
  expect(rendered).toBeTruthy();
});
