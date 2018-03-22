import React from 'react';
import _ from 'lodash';
import { signInWithGoogleAsync } from './GoogleApi';

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
];
const spreadsheetId = '1Ga35NSevZnTb96VEIe_txoSoHgI-rPsB29hjf5_x_o4';
const range = 'Sheet1!A1%3AJ1';
const apiUrl = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '/values/' + range + ':append';
const pathArgs = '?valueInputOption=USER_ENTERED';
export let token = '';

export async function uploadCritiques(critiques, givenToken) {
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

  if (!givenToken) {
    token = await signInWithGoogleAsync();
  }
  if (!token) {
    return { success: false, message: 'Google sign in failed'};
  }

  try {
    let response = await fetch(apiUrl + pathArgs, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        values: cellData,
      }),
    });
    if (response.status == 200) {
      return { success: true, message: 'uploaded successfully' };
    }
    // if there was an error uploading, it may be because the token has expired
    token = '';
    return { success: false, message: 'error uploading' + (await response.json()) };
  } catch (error) {
    console.error(error);
    return { success: false, message: error};
  }
};
