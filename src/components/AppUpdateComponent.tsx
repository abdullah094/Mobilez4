import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Modal} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
const AppUpdateScreen = () => {
  const [visable, setVisable] = useState(false);
  const [version, setVersion] = useState(false);
  const handleUpdatePress = () => {
    // Replace 'your-app-store-url' with the actual URL of your app on the app store
    const appStoreUrl =
      'https://play.google.com/store/apps/details?id=com.wizard.mobilez';

    Linking.openURL(appStoreUrl)
      .then(() => {
        // The URL was successfully opened
      })
      .catch(error => {
        console.error('Failed to open URL:', error);
        // Handle the error appropriately (e.g., show an error message to the user)
      });
  };
  const fetchVersionData = () => {
    axios
      .get('https://www.mobilezmarket.com/api/version')
      .then(response => {
        const _version = response.data;

        const curVersion = DeviceInfo.getVersion(); // Get the current version using react-native-device-info
        console.log(_version.version, curVersion);

        if (parseFloat(curVersion) < parseFloat(_version.version)) {
          setVisable(true);

          console.log('iffffffffffffffffffffff');
        } else {
          setVisable(false);
          console.log('elseeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
        }
        console.log('_profile', _version.ios);
      })
      .catch(error => {
        console.log('_version' + error);
      });
  };

  useEffect(() => {
    fetchVersionData();
  }, []);
  return (
    <Modal
      visible={visable}
      onDismiss={() => {
        setVisable(false);
      }}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            borderRadius: 20,
            paddingBottom: 16,
            top: '10%',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            alignItems: 'center',
            elevation: 4,
            position: 'absolute',
            zIndex: 999,
            backgroundColor: '#fff',
            width: '80%',
          }}>
          <Pressable
            onPress={() => setVisable(false)}
            style={{
              position: 'absolute',
              right: 0,
              top: -35,
              zIndex: 999,
              padding: 5,
            }}>
            <Entypo name={'circle-with-cross'} size={30} color={'black'} />
          </Pressable>
          <View
            style={{
              backgroundColor: '#015dcf',
              width: '100%',
              paddingVertical: 6,
              paddingHorizontal: 16,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 15}}>
              App Update
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 16,
              marginTop: 16,
            }}>
            <Text style={{color: 'grey'}}>
              A newer version of MOBILEZ MARKET is available. You must download
              the latest version from the Google Play Store to continue using
              MOBILEZ MARKET services.
            </Text>
          </View>

          <TouchableOpacity
            style={{
              marginTop: 20,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
              backgroundColor: 'orange',
            }}
            onPress={handleUpdatePress}>
            <Text style={{color: '#fff'}}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AppUpdateScreen;

const styles = StyleSheet.create({});
