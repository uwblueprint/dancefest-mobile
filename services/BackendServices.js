import React from 'react';
import _ from 'lodash';

const orderedColNames = [
  'danceNumber',
  'danceTitle',
  'danceChoreographer',
  'danceStyle',
  'danceLevel',
  'techniqueMark',
  'spatialAwarenessMark',
  'useOfMusicTextSilenceMark',
  'communicationElementsMark',
  'communicationMark',
  'audioRecordingUri',
];
const apiUrl = '/backend-api/'
export let token = '';

export async function uploadCritiques(critiques, givenToken) { // TODO: modify token implementation
  // convert array of objects into array of arrays
  const cellData = [];
  _.forEach(critiques, () => {
    cellData.push([]);
  });

  _.forEach(critiques, (critique, index) => {
    _.forEach(orderedColNames, (colName) => {
      cellData[index].push(critique[colName]);
    });
  });

  //TODO: remove implementation of google related services
  // if (!givenToken) {
  //   token = await signInWithGoogleAsync();
  // }

  token = givenToken; //for now allow it

  if (!token) {
    return { success: false, message: 'Connection to Flask failed; no token!'};
  }

  try {
    let response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'//,
        // Authorization: 'Bearer ' + token,
        // TODO: make use of tokens here??
      },
      body: JSON.stringify({
        values: cellData,
      }),
    });
    if (response.status == 200) {
      return { success: true, message: 'uploaded successfully' };
    }

    // TODO: response status is not 200 implies many things
    // handle accordingly
    // can also means token has expired

  } catch (error) {
    console.error(error);
    return { success: false, message: error};
  }
};
