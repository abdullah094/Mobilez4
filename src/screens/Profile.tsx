import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import tw from 'twrnc';
import {
  selectAccessToken,
  selectProfileData,
  setProfileData,
} from '../Redux/Slices';
import AlertModale from '../components/AlertModale';
import Header from '../components/Header';
import {color} from '../constants/Colors';
import {Profile as Pro} from '../types';

const {width, height} = Dimensions.get('window');
const Profile = ({navigation}) => {
  const profile = useSelector(selectProfileData) as Pro;
  const dispatch = useDispatch();
  const image_dimension = 140;
  const _accessToken = useSelector(selectAccessToken);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [state, setState] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    first_name_Enabled: boolean;
    last_name_Enabled: boolean;
    email_Enabled: boolean;
  }>({
    first_name: profile.first_name,
    last_name: profile.last_name,
    email: profile.email,
    first_name_Enabled: false,
    last_name_Enabled: false,
    email_Enabled: false,
  });

  useEffect(() => {
    setState({
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      first_name_Enabled: false,
      last_name_Enabled: false,
      email_Enabled: false,
    });
  }, [profile]);

  const image_url = 'https://www.mobilezmarket.com/images/';
  const UpdateProfile = () => {
    setLoading(true);

    axios
      .post('https://www.mobilezmarket.com/api/update-profile', state, {
        headers: {Authorization: `Bearer ${_accessToken}`},
      })
      .then(response => {
        const {
          message,
          status,
          errors,
        }: {
          message: string;
          status: number;
          errors: {
            first_name: string[];
            last_name: string[];
            email: string[];
          };
        } = response.data;
        console.log({
          message,
          status,
          errors,
        });

        if (status == 400) {
          Object.entries(errors).map(([key, value]) => {
            // Alert.alert(value[key]);
            setMessage(value[0]);
          });
        } else {
          setMessage(message);
          dispatch(
            setProfileData({
              ...profile,
              first_name: state.first_name,
              last_name: state.last_name,
              email: state.email,
            }),
          );
        }

        setLoading(false);
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        setMessage(JSON.stringify(error));
        setLoading(false);
      });
  };
  if (state == null) return <ActivityIndicator />;

  return (
    <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
      <View style={tw`bg-[#edf2f2] flex-1`}>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          <Header title="Profile" />
          <View
            style={{
              width: width,
              height: 40,
              backgroundColor: color.orange,
            }}
          />
          <Image
            resizeMode="contain"
            source={
              profile.photo
                ? {
                    uri: profile.photo?.includes('https')
                      ? profile.photo
                      : image_url + profile.photo,
                  }
                : require('../assets/mobile-logo.png')
            }
            style={{
              width: image_dimension,
              height: 140,
              borderRadius: image_dimension / 2,
              borderWidth: 1,
              borderColor: 'orange',
              backgroundColor: 'white',
              bottom: 50,
              left: 10,
            }}
          />
          <Text style={styles.h1}>{profile.first_name}</Text>
          <Text style={styles.h1}>{profile.last_name}</Text>
          <View style={styles.box}>
            <TextInput
              disabled={!state.first_name_Enabled}
              mode="outlined"
              label="First name"
              placeholder={profile.first_name}
              placeholderTextColor={'black'}
              value={state.first_name}
              onChangeText={text =>
                setState(prev => ({...prev, first_name: text}))
              }
              right={
                <TextInput.Icon
                  icon="pencil"
                  onPress={() =>
                    setState(prev => ({
                      ...prev,
                      first_name_Enabled: !prev.first_name_Enabled,
                    }))
                  }
                />
              }
            />
          </View>
          <View style={styles.box}>
            <TextInput
              disabled={!state.last_name_Enabled}
              mode="outlined"
              label="Last name"
              placeholder={profile.last_name}
              placeholderTextColor={'black'}
              value={state.last_name}
              onChangeText={text =>
                setState(prev => ({...prev, last_name: text}))
              }
              right={
                <TextInput.Icon
                  icon="pencil"
                  onPress={() =>
                    setState(prev => ({
                      ...prev,
                      last_name_Enabled: !prev.last_name_Enabled,
                    }))
                  }
                />
              }
            />
          </View>
          <View style={styles.box}>
            <TextInput
              disabled={!state.email_Enabled}
              mode="outlined"
              label="Email"
              placeholder={profile.email}
              placeholderTextColor={'black'}
              value={state.email}
              onChangeText={text => setState(prev => ({...prev, email: text}))}
              right={
                <TextInput.Icon
                  icon="pencil"
                  onPress={() =>
                    setState(prev => ({
                      ...prev,
                      email_Enabled: !prev.email_Enabled,
                    }))
                  }
                />
              }
            />
          </View>
          <View style={styles.box}>
            <TextInput
              disabled
              mode="outlined"
              label="City"
              placeholder={profile.city}
              placeholderTextColor={'black'}
              value={profile.city}
              onChangeText={text => setState(prev => ({...prev, email: text}))}
            />
          </View>
          <Button
            style={tw`mt-5 bg-blue-600`}
            mode="contained"
            loading={loading}
            labelStyle={{color: 'white'}}
            disabled={
              loading ||
              (!state.first_name_Enabled &&
                !state.last_name_Enabled &&
                !state.email_Enabled)
            }
            onPress={UpdateProfile}>
            Update Profile
          </Button>
        </ScrollView>
        <AlertModale message={message} setMessage={setMessage} />
      </View>
    </SafeAreaView>
  );
};
export default Profile;

const styles = StyleSheet.create({
  h1: {fontWeight: 'bold', color: color.black, fontSize: 20},
  box: {
    width: width - 50,
    marginTop: 15,
  },
  h2: {
    color: color.black,
    fontSize: 16,
    marginLeft: 1,
    fontWeight: '700',
  },
  input: {
    borderBottomWidth: 1,
    height: 30,
    marginTop: 0,
    paddingBottom: 0,
    paddingTop: 0,
    padding: 0,
    color: color.black,
  },
  pencilIcon: {
    position: 'absolute',
    right: 10, // Adjust the left position as needed
    bottom: 15, // Adjust the top position as needed
  },
});
