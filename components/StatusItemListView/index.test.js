import React from 'react';
import { DANCE_STATUS }  from './../StatusItem/index';
import StatusItemListView from './index';
import renderer from 'react-test-renderer';

it('Renders exclamation without crashing', () => {
  const rendered = renderer.create(<StatusItemListView statusItemData={[ { danceNum:103, danceStatus:DANCE_STATUS.requireInternet, danceName:'PrintTheBlue' }, ]}/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('Renders checkmark without crashing', () => {
  const rendered = renderer.create(<StatusItemListView statusItemData={[ { danceNum:101, danceStatus:DANCE_STATUS.uploaded, danceName:'Plz review me' }, ]}/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('Renders loop without crashing', () => {
  const rendered = renderer.create(<StatusItemListView statusItemData={[ { danceNum:107, danceStatus:DANCE_STATUS.loading, danceName:'DancefestDab' }, ]}/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('Renders mixed list without crashing', () => {
  const rendered = renderer.create(<StatusItemListView statusItemData={[
                                  { danceNum:103, danceStatus:DANCE_STATUS.requireInternet, danceName:'PrintTheBlue' },
                                  { danceNum:107, danceStatus:DANCE_STATUS.loading, danceName:'DancefestDab' },
                                  { danceNum:1, danceStatus:DANCE_STATUS.requireInternet, danceName:'The insanely super super long name that goes on forever' },
                                  { danceNum:101, danceStatus:DANCE_STATUS.uploaded, danceName:'Plz review me' },
                                  { danceNum:1209, danceStatus:DANCE_STATUS.loading, danceName:'the boogie'},
                  ]}/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('Renders mixed list longer than screen without crashing', () => {
  const rendered = renderer.create(<StatusItemListView statusItemData={[
                                  { danceNum:103, danceStatus:DANCE_STATUS.requireInternet, danceName:'PrintTheBlue' },
                                  { danceNum:107, danceStatus:DANCE_STATUS.loading, danceName:'DancefestDab' },
                                  { danceNum:1, danceStatus:DANCE_STATUS.requireInternet, danceName:'The insanely super super long name that goes on forever' },
                                  { danceNum:101, danceStatus:DANCE_STATUS.uploaded, danceName:'Plz review me' },
                                  { danceNum:1209, danceStatus:DANCE_STATUS.loading, danceName:'the boogie'},
                                  { danceNum:1103, danceStatus:DANCE_STATUS.requireInternet, danceName:'PrintTheBlue' },
                                  { danceNum:1107, danceStatus:DANCE_STATUS.loading, danceName:'DancefestDab' },
                                  { danceNum:11, danceStatus:DANCE_STATUS.requireInternet, danceName:'The insanely super super long name that goes on forever' },
                                  { danceNum:1101, danceStatus:DANCE_STATUS.uploaded, danceName:'Plz review me' },
                                  { danceNum:11209, danceStatus:DANCE_STATUS.loading, danceName:'the boogie'},
                                  { danceNum:203, danceStatus:DANCE_STATUS.requireInternet, danceName:'PrintTheBlue' },
                                  { danceNum:207, danceStatus:DANCE_STATUS.loading, danceName:'DancefestDab' },
                                  { danceNum:2, danceStatus:DANCE_STATUS.requireInternet, danceName:'The insanely super super long name that goes on forever' },
                                  { danceNum:201, danceStatus:DANCE_STATUS.uploaded, danceName:'Plz review me' },
                                  { danceNum:2209, danceStatus:DANCE_STATUS.loading, danceName:'the boogie'},
                  ]}/>).toJSON();
  expect(rendered).toBeTruthy();
});
