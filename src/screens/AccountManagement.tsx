import React from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'twrnc';
import Header from '../components/Header';

const AccountManagement = () => {
  const openURI = async () => {
    const url = 'https://www.mobilezmarket.com/manage-account';
    const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
    if (supported) {
      await Linking.openURL(url); // It will open the URL on browser.
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
      <View style={tw`bg-[#edf2f2] flex-1`}>
        <ScrollView>
          <Header title="Account Management" />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{}}>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '500',
                  color: 'black',
                }}>
                To delete your user account on the Mobilez Market application,
                please follow these steps:
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                1. Visit the Mobilez Market Login page by clicking on the
                following link:
              </Text>
              <TouchableOpacity
                style={{paddingHorizontal: 10}}
                onPress={openURI}>
                <Text style={{color: '#015dcf'}}>
                  https://www.mobilezmarket.com/signin
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                Login Your Account then
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                2. Visit the Mobilez Market account management page by clicking
                on the following link:
              </Text>
              <TouchableOpacity
                style={{paddingHorizontal: 10}}
                onPress={openURI}>
                <Text style={{color: '#015dcf'}}>
                  https://www.mobilezmarket.com/manage-account.
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                3. Once you're on the account management page, locate the
                section where you need to submit your email and user ID. This
                information can typically be found on your user details page
                within the application.
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                4. Enter your email address and user ID in the respective fields
                provided.
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                5. Double-check the entered information to ensure accuracy.
                Deleting your account is irreversible, so it's crucial to make
                sure you're deleting the correct account.
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                6. After verifying your email and user ID, click on the "Submit"
                button to proceed with the account deletion process.
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                A confirmation message will appear, notifying you that the
                deletion action is permanent and cannot be undone. Take a moment
                to read and understand this message.
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                7. If you are certain that you want to delete your account,
                click on the "Confirm" or "Delete Account" button, depending on
                the wording used on the confirmation message.
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                8. The application will process your request and permanently
                delete your user account. You will no longer have access to your
                account or any associated data.
              </Text>
              <Text
                style={{
                  padding: 10,
                  fontWeight: '400',
                  color: 'black',
                }}>
                9. It's important to note that once the account is deleted, it
                cannot be recovered. Therefore, ensure that you have backed up
                any important data or information you may need before proceeding
                with the deletion.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AccountManagement;

const styles = StyleSheet.create({});
