import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

const SigninWithGoogle = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '314321190889-ths4et7g70cu60pledvq1trk84ksj1qv.apps.googleusercontent.com',
    });
  });

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken, user, serverAuthCode, scopes} =
        await GoogleSignin.signIn();
      console.log('ther user is :=> ', user);
      console.log('the user token is=>', idToken);
      console.log('the serverAuthCode is =>', serverAuthCode);
      console.log('scopes is =>', scopes);

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log('google Credential', googleCredential);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log('Error while google signin', error);
    }
  }

  return (
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity
        className="px-8 rounded-md py-3 bg-purple-700 mt-4"
        onPress={onGoogleButtonPress}>
        <Text className="text-white font-spacegrotesk-regular text-base">
          SigninWithGoogle
        </Text>
      </TouchableOpacity>
      <GoogleSigninButton />
    </View>
  );
};

export default SigninWithGoogle;
