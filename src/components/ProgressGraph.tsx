import {GET_PROFILE_DATA, MY_ADS} from '@env';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import tw from 'twrnc';
import {selectAccessToken, selectProfileData} from '../Redux/Slices';
import Header from './Header';

const ProgressGraph = () => {
  const _accessToken = useSelector(selectAccessToken);
  const [data, setData] = useState([]);
  const [monthly, setMonthly] = useState(0);
  const profile = useSelector(selectProfileData);
  const [userProgress, setUserProgress] = useState(0);

  // const userProgress = parseInt(profile.progress);
  console.log('_Profile Data', typeof profile.progress);
  const myAdd = () => {
    axios
      .get(MY_ADS, {
        headers: {Authorization: `Bearer ${_accessToken}`},
      })
      .then(response => {
        if (response.data.my_adds) {
          setData(response.data.my_adds);
          console.log('Response', response.data.my_adds);
          updateProgress(response.data.my_adds);
        } else {
        }
      })
      .catch(error => {
        console.log('hello', error);
      });
  };

  const getMe = () => {
    axios
      .get(GET_PROFILE_DATA, {
        headers: {Authorization: `Bearer ${_accessToken}`},
      })
      .then(response => {
        if (response.data) {
          setUserProgress(response.data.profile?.progress);
        } else {
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    myAdd();
    getMe();
  }, [_accessToken]);

  const [adsPosted, setAdsPosted] = useState([]);
  const [lastUpdateDate, setLastUpdateDate] = useState([]);

  const updateProgress = (adds: any) => {
    const today = new Date().toISOString().split('T')[0];
    console.log('today date', typeof today);

    // const filtered = adds.sort(new Date());
    const filtered = adds.filter(obj => {
      const date = obj.created_at.split('T')[0];
      return date === today; // Return true or false based on the condition
    });

    const currentDate = new Date();

    console.log('array today date', filtered);

    setLastUpdateDate(filtered);
  };
  const dalyAdsPosted = lastUpdateDate?.length;
  const DAILY_GOAL = 3; // 3 ads per day
  //   const totalAdsPosted = 3;
  const todaysProgress = dalyAdsPosted / DAILY_GOAL;

  const totalAdsPosted = 40;
  //   const totalAdsPosted = 3;
  const combinedGoal = 100; // Assuming 30 days in a month
  const combinedProgressPercentage = 40 / 100;

  console.log('todaysProgress', totalAdsPosted, combinedProgressPercentage);

  return (
    <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
      <View style={tw`bg-[#edf2f2] flex-1`}>
        {/* <ScrollView> */}
        <View style={[tw`flex-1`]}>
          <Header title="Your Progress " />
          <View style={{flex: 1}}>
            <View style={styles.progressContainer}>
              <Text style={styles.progressLabel}>Daily Progress</Text>
              <Progress.Circle
                progress={todaysProgress}
                size={220}
                color="black"
                direction="clockwise"
                borderWidth={10}
                showsText
                strokeCap="round"
                borderColor="orange"
                style={{marginTop: 10}}
                fill="white"
              />
              {/* <Text style={styles.progressText}>
                  {dalyAdsPosted} / {DAILY_GOAL} ads posted
                </Text> */}
            </View>

            <View style={styles.progressContainer}>
              <Text style={styles.progressLabel}>Monthly Progress</Text>
              <Progress.Circle
                progress={userProgress / 100}
                size={220}
                color="black"
                direction="clockwise"
                borderWidth={10}
                showsText
                strokeCap="round"
                borderColor="orange"
                style={{marginTop: 10}}
                fill="white"
              />
              {/* <Text style={styles.progressText}>
                  {totalAdsPosted} / {combinedGoal} ads posted
                </Text> */}
            </View>
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',

    borderRadius: 10,
    margin: 10,
  },
  bar: {
    height: 20,

    borderRadius: 10,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 10,
    height: '45%',
    backgroundColor: 'white',
  },
  progressLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'black',
  },
  progressText: {
    fontSize: 16,
    marginTop: 5,
    color: 'black',
  },
});

export default ProgressGraph;
