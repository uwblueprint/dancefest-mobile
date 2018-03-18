import React from 'react';
import { Button } from 'react-native';
import _ from 'lodash';

const critiques = [
  {
    schoolName: "AY Jackson",
    judgeName: "Jimmy Bobby",
    style: "Contemporary",
    levelOfCompetition: "Novice",
  },
  {
    schoolName: "Ryerson",
    judgeName: "Saylor Twift",
    style: "Jazz",
    levelOfCompetition: "Competitive II",
  },
];

const GoogleSheets = ({}) => {
  uploadCritiques = async (critiques) => {
    const orderedColNames = ['schoolName', 'judgeName', 'style', 'levelOfCompetition'];
    const cellData = [];
    _.forEach(critiques, () => {
      cellData.push([]);
    });

    _.forEach(critiques, (critique, index) => {
      _.forEach(orderedColNames, (colName) => {
        cellData[index].push(critique[colName]);
      });
    });

    // get oauth access token

    try {
      let response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/12FR7iWDNvUk6zvGMu74kzc7Iu6TX3JJzJ-SkKwHP6oM/values/Sheet1!A1:E1:append?key=AIzaSyCIU25fAKLoYwTBa9V2vcUbV6HvW4np4KA', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'majorDimension': 'ROWS',
          'values': cellData,
          'scope': ['https://www.googleapis.com/auth/spreadsheets'],
          'access_token': '939408090084-ut0a08in354ne8l7fv0nikhb0ltbhnrl.apps.googleusercontent.com',
        }),
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button title='Upload' onPress={async () => uploadCritiques(critiques)}></Button>
  );
};

export default GoogleSheets;
