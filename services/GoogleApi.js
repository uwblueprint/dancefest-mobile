import { Google, Constants } from 'expo';

const config =
 Constants.appOwnerShip === 'standalone' ? Constants.platform.ios ? {
   iosStandaloneAppClientId: '620228359926-l9um9agdpoogfs82thfi1u5g7pjsgniu.apps.googleusercontent.com',
   scopes: ['https://www.googleapis.com/auth/spreadsheets'],
} :{
   androidStandaloneAppClientId: '620228359926-6fc09eiven81esan1uh3eg003fa812hs.apps.googleusercontent.com',
   scopes: ['https://www.googleapis.com/auth/spreadsheets'],
} :{
   androidClientId: '620228359926-gr8206oqn5ci5hdauao697qmpb8inj08.apps.googleusercontent.com',
   iosClientId: '620228359926-l9um9agdpoogfs82thfi1u5g7pjsgniu.apps.googleusercontent.com',
   webClientId: '620228359926-hu7e9luilvk67fa3qvper6dnkep68jj6.apps.googleusercontent.com',
   scopes: ['https://www.googleapis.com/auth/spreadsheets'],
};

export async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync(config);

    if (result.type === 'success') {
      return result.accessToken;
    } else {
      console.log("login cancelled");
      return null;
    }
  } catch(error) {
    console.log("login error", error);
    return null;
  }
};
