import React from 'react';
import StatusItemListView from './index';
import renderer from 'react-test-renderer';

it('Renders red exclamation without crashing', () => {
  const rendered = renderer.create(<StatusItemListView statusItemData={[ { id: 1, danceNumber:103, danceTitle:'PrintTheBlue', uploadDanceCritiqueError:'Could not upload critique', uploadDanceAudioRecordingError:'Could not upload recording'}, ]}/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('Renders checkmark without crashing', () => {
  const rendered = renderer.create(<StatusItemListView statusItemData={[ { id: 1, danceNumber:101, danceTitle:'Plz review me' }, ]}/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('Renders grey exclamation without crashing', () => {
  const rendered = renderer.create(<StatusItemListView statusItemData={[ { id: 1, danceNumber:107, danceTitle:'DancefestDab', uploadDanceCritiqueError:'', uploadDanceAudioRecordingError:'' }, ]}/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('Renders mixed list without crashing', () => {
  const rendered = renderer.create(<StatusItemListView statusItemData={[
                                  { id: 1, danceNumber:103, danceTitle:'PrintTheBlue', uploadDanceCritiqueError:'Could not upload critique', uploadDanceAudioRecordingError:'Could not upload recording'},
                                  { id: 2, danceNumber:107, danceTitle:'DancefestDab', uploadDanceCritiqueError:'', uploadDanceAudioRecordingError:'' },
                                  { id: 3, danceNumber:1, danceTitle:'The insanely super super long name that goes on forever', uploadDanceCritiqueError:'Could not upload critique', uploadDanceAudioRecordingError:'' },
                                  { id: 4, danceNumber:101, danceTitle:'Plz review me' },
                  ]}/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('Renders mixed list longer than screen without crashing', () => {
  const rendered = renderer.create(<StatusItemListView statusItemData={[
                                  { id: 1, danceNumber:103, danceTitle:'PrintTheBlue', uploadDanceCritiqueError:'Could not upload critique', uploadDanceAudioRecordingError:'Could not upload recording'},
                                  { id: 2, danceNumber:107, danceTitle:'DancefestDab', uploadDanceCritiqueError:'', uploadDanceAudioRecordingError:'' },
                                  { id: 3, danceNumber:1, danceTitle:'The insanely super super long name that goes on forever', uploadDanceCritiqueError:'Could not upload critique', uploadDanceAudioRecordingError:'' },
                                  { id: 4, danceNumber:101, danceTitle:'Plz review me' },
                                  { id: 5, danceNumber:103, danceTitle:'PrintTheBlue', uploadDanceCritiqueError:'Could not upload critique', uploadDanceAudioRecordingError:'Could not upload recording'},
                                  { id: 6, danceNumber:107, danceTitle:'DancefestDab', uploadDanceCritiqueError:'', uploadDanceAudioRecordingError:'' },
                                  { id: 7, danceNumber:1, danceTitle:'The insanely super super long name that goes on forever', uploadDanceCritiqueError:'Could not upload critique', uploadDanceAudioRecordingError:'' },
                                  { id: 8, danceNumber:101, danceTitle:'Plz review me' },
                                  { id: 9, danceNumber:103, danceTitle:'PrintTheBlue', uploadDanceCritiqueError:'Could not upload critique', uploadDanceAudioRecordingError:'Could not upload recording'},
                                  { id: 10, danceNumber:107, danceTitle:'DancefestDab', uploadDanceCritiqueError:'', uploadDanceAudioRecordingError:'' },
                                  { id: 11, danceNumber:1, danceTitle:'The insanely super super long name that goes on forever', uploadDanceCritiqueError:'Could not upload critique', uploadDanceAudioRecordingError:'' },
                                  { id: 12, danceNumber:101, danceTitle:'Plz review me' },
                                  { id: 13, danceNumber:103, danceTitle:'PrintTheBlue', uploadDanceCritiqueError:'Could not upload critique', uploadDanceAudioRecordingError:'Could not upload recording'},
                                  { id: 14, danceNumber:107, danceTitle:'DancefestDab', uploadDanceCritiqueError:'', uploadDanceAudioRecordingError:'' },
                                  { id: 15, danceNumber:1, danceTitle:'The insanely super super long name that goes on forever', uploadDanceCritiqueError:'Could not upload critique', uploadDanceAudioRecordingError:'' },
                                  { id: 16, danceNumber:101, danceTitle:'Plz review me' },

                  ]}/>).toJSON();
  expect(rendered).toBeTruthy();
});
