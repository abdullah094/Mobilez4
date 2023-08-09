import {APPLE_CLIENT_SECRET_P8, SOCIAL_LOGIN} from '@env';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setAccessToken} from '../Redux/Slices';
import {IndexNavigationProps} from '../types';

const AppleLoginButton = () => {
  const navigation = useNavigation<IndexNavigationProps<'Login'>>();
  const dispatch = useDispatch();
  const [credentialStateForUser, updateCredentialStateForUser] = useState('-1');
  useEffect(() => {
    if (!appleAuth.isSupported) return;

    fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
      updateCredentialStateForUser(`Error: ${error.code}`),
    );
  }, []);

  useEffect(() => {
    if (!appleAuth.isSupported) return;

    return appleAuth.onCredentialRevoked(async () => {
      console.warn('Credential Revoked');
      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
        updateCredentialStateForUser(`Error: ${error.code}`),
      );
    });
  }, []);

  if (!appleAuth.isSupported) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <Text>Apple Authentication is not supported on this device.</Text>
      </View>
    );
  }
  /**
   * You'd technically persist this somewhere for later use.
   */
  let user = null;

  /**
   * Fetches the credential state for the current user, if any, and updates state on completion.
   */
  async function fetchAndUpdateCredentialState(updateCredentialStateForUser) {
    if (user === null) {
      updateCredentialStateForUser('N/A');
    } else {
      const credentialState = await appleAuth.getCredentialStateForUser(user);
      if (credentialState === appleAuth.State.AUTHORIZED) {
        updateCredentialStateForUser('AUTHORIZED');
      } else {
        updateCredentialStateForUser(credentialState);
      }
    }
  }

  /**
   * Starts the Sign In flow.
   */
  async function onAppleButtonPress(updateCredentialStateForUser) {
    console.warn('Beginning Apple Authentication');

    // start a login request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      console.log('appleAuthRequestResponse', appleAuthRequestResponse);

      const {
        user: newUser,
        email,
        nonce,
        identityToken,
        fullName,
        authorizationCode,
        realUserStatus /* etc */,
      } = appleAuthRequestResponse;

      // user = newUser;

      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
        updateCredentialStateForUser(`Error: ${error.code}`),
      );

      if (identityToken) {
        const mail = email ?? newUser.concat('@apple.com');
        const name = fullName?.familyName ?? newUser;
        axios
          .post(SOCIAL_LOGIN, {
            email: mail,
            id: identityToken,
            name: name,
            avatar: null,
          })

          .then(response => {
            const data = response.data;
            if (data.status) {
              Alert.alert(data.message);
              dispatch(setAccessToken(data.token));
              PutAccessTokenToAsync(data.token);
            } else {
              Alert.alert(data.message);
            }
          })
          .catch(error => {
            console.log('error', error);
            Alert.alert('Error', error.message);
          });
        // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
        console.log(nonce, identityToken, newUser);
      } else {
        // no token - failed sign-in?
      }

      if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
        console.log("I'm a real person!");
      }

      console.warn(`Apple Authentication Completed, ${user}, ${email}`);
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.warn('User canceled Apple Sign in.');
      } else {
        console.error(error);
      }
    }
    try {
      const authTokenBody = new URLSearchParams({
        client_id: 'com.example.app',
        client_secret: APPLE_CLIENT_SECRET_P8,
        code: authorizationCode as string,
        grant_type: 'authorization_code',
      });
      const generateAuthTokenUrl = 'https://appleid.apple.com/auth/token';
      const authTokenResponse = await axios.post(
        generateAuthTokenUrl,
        authTokenBody,
        config,
      );
      if (!authTokenResponse.data.refresh_token) {
        console.log('No refresh token data');
      }
      const revokeTokenBody = new URLSearchParams({
        client_id: 'com.example.app',
        client_secret: APPLE_CLIENT_SECRET_P8,
        token: authTokenResponse.data.refresh_token as string,
        token_type_hint: 'refresh_token',
      });
      const revokeAuthTokenUrl = 'https://appleid.apple.com/auth/revoke';
      await axios.post(revokeAuthTokenUrl, revokeTokenBody, config);
    } catch (e) {
      console.error(e);
    }
  }
  const PutAccessTokenToAsync = async accessToken => {
    try {
      await AsyncStorage.setItem('@user_token', accessToken);
      navigation.navigate('Home');
    } catch (e) {
      console.log('Error saving Data to AsyncStorage:', e);
    }
  };
  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        'If this function executes, User Credentials have been Revoked',
      );
    });
  }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

  return (
    <AppleButton
      buttonStyle={AppleButton.Style.WHITE}
      buttonType={AppleButton.Type.SIGN_IN}
      style={{
        width: 160, // You must specify a width
        height: 45, // You must specify a height
      }}
      onPress={() => onAppleButtonPress(updateCredentialStateForUser)}
    />
  );
};

export default AppleLoginButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
