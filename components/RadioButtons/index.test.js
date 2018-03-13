import React from 'react';
import RadioButtons from './index';
import { noop } from 'lodash/fp'

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(
    <RadioButtons
      input={{value: 'a', onChange: noop }}
      buttonNames={['a', 'b']} />
  ).toJSON();
  expect(rendered).toBeTruthy();
});

it('renders merged buttons without crashing', () => {
  const rendered = renderer.create(
    <RadioButtons input={{value: 'a', onChange: () => {}}} mergeButtons={true} buttonNames={['a', 'b']}/>
  ).toJSON();
  expect(rendered).toBeTruthy();
});
