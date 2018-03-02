import React from 'react';
import ButtonRadio from './index';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<ButtonRadio buttonNames={['a', 'b']}/>).toJSON();
  expect(rendered).toBeTruthy();
});
