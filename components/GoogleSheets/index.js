import { Button, fetch } from 'react-native';

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
  uploadCritiques = ({ critiques }) => {
    const orderedColNames = ['schoolName', 'judgeName', 'style', 'levelOfCompetition'];
    const cellData = [];
    _.forEach(critiques, () => {
      cellData.pushBack([]);
    });

    _.forEach(critiques, ({ critique, index }) => {
      _.forEach(orderedColNames, ({ colName }) => {
        cellData[index].pushBack[critique[colName]];
      });
    });

    console.log(cellData);

    // try {
    //   let response = await fetch('https://mywebsite.com/endpoint/', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       'range': 'Sheet1!A1:E1',
    //       'majorDimension': 'ROWS',
    //       'values': [
    //         ['Door', '$15', '2', '3/15/2016'],
    //         ['Engine', '$100', '1', '3/20/2016'],
    //       ],
    //     }),

    //   });
    //   console.log(response);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <Button title='Upload' onPress={() => uploadCritiques(critiques)}></Button>
  );
};