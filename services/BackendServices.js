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
const apiUrl = 'http://192.168.0.103:5000';
const backendLink = '/api/';

// TODO: modify token implementation
export async function sendToAPI(critiques) {

  try {
    let response = await fetch(apiUrl + backendLink, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: critiques
      }),
    });
    if (response.status == 200) {
      return { success: true, message: 'uploaded successfully' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: error};
  }
};
