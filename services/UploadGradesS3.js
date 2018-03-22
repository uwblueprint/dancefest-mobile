import React from 'react';
import _ from 'lodash';

export async function downloadAndUploadGrades(danceCritique) {

    //create an Object from the Dance CritiqueSection
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

    let cellData = [];

    _.forEach(orderedColNames, (colName) => {
      cellData.push(danceCritique[colName]);
    });

    //convert this so it can be added to the csv
    const rowData = cellData.join()
    let apiUrl = 'http://localhost:5000/uploadGrades/' + rowData;

    console.log("POSTing " + " to " + apiUrl);

    const request = new Request(apiUrl);

    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'text/csv'
      },
      body: JSON.stringify({
        data: rowData
      })
    }).then((response) => {
      {success: true, message: 'uploaded successfully'}
    }).catch(error => {
      console.log(error)
      return error
    })
  };

const test_obj =  {
  "communicationElementsMark": "66",
  "communicationMark": "99",
  "danceChoreographer": "Jbkhih",
  "danceId": "1521738742906",
   "danceLevel": "C2",
   "danceNumber": "1258",
  "danceStyle": "Teacher Choreographed Dances",
   "danceTitle": "Jbibih",
   "spatialAwarenessMark": "96",
   "techniqueMark": "36",
   "useOfMusicTextSilenceMark": "36",
 }
