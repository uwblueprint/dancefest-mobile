import Expo from 'expo';

export async function signInWithGoogleAsync() {
  try {
    const result = await Expo.Google.logInAsync({
      androidClientId: '620228359926-gr8206oqn5ci5hdauao697qmpb8inj08.apps.googleusercontent.com',
      iosClientId: '620228359926-l9um9agdpoogfs82thfi1u5g7pjsgniu.apps.googleusercontent.com',
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

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
