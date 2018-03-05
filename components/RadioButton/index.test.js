import React from 'react';
import RadioButton from './index';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<RadioButton buttonNames={['a', 'b']}/>).toJSON();
  expect(rendered).toBeTruthy();
});
