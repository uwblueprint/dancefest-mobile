import React from 'react';
import Button from './index';
import { noop } from 'lodash/fp'

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(
    <Button
      color='black'
      onSubmit={noop} />
  ).toJSON()
  expect(rendered).toBeTruthy();
});
