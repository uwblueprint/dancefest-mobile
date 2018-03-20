export async function signInWithGoogleAsync() {
  try {
    const result = await Expo.Google.logInAsync({
      androidClientId: '939408090084-goeojtkur4qj31f1iosrdf2ker47vfkp.apps.googleusercontent.com',
      iosClientId: '939408090084-022pmge4h770dj1dk4u0i64fpk0bqqjm.apps.googleusercontent.com',
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    if (result.type === 'success') {
      return result.accessToken;
    } else {
      console.log("login cancelled");
      return null;
    }
  } catch(e) {
    console.log("login error");
    return null;
  }
};
