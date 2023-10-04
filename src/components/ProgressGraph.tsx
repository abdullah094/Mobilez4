import {MY_ADS} from '@env';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import tw from 'twrnc';
import {selectAccessToken, selectProfileData} from '../Redux/Slices';
import Header from './Header';

const ProgressGraph = () => {
  const _accessToken = useSelector(selectAccessToken);
  const [data, setData] = useState([]);
  const profile = useSelector(selectProfileData);
  console.log('_Profile Data', profile);
  const myAdd = () => {
    axios
      .get(MY_ADS, {
        headers: {Authorization: `Bearer ${_accessToken}`},
      })
      .then(response => {
        if (response.data.my_adds) {
          setData(response.data.my_adds);
          console.log('Response', response.data);
          updateProgress(response.data.my_adds);
        } else {
        }
      })
      .catch(error => {
        console.log('hello', error);
      });
  };

  useEffect(() => {
    myAdd();
  }, [_accessToken]);

  const [adsPosted, setAdsPosted] = useState([]);
  const [lastUpdateDate, setLastUpdateDate] = useState([]);

  const updateProgress = (adds: any) => {
    const filtered = adds.sort((a, b) => a.created_at - b.created_at);

    const currentDate = new Date();

    // console.log('array', filtered);

    setLastUpdateDate(filtered);
  };
  const dalyAdsPosted = lastUpdateDate?.length;
  const DAILY_GOAL = 3; // 3 ads per day
  //   const totalAdsPosted = 3;
  const todaysProgress = dalyAdsPosted / DAILY_GOAL;

  const totalAdsPosted = data?.length;
  //   const totalAdsPosted = 3;
  const combinedGoal = 90; // Assuming 30 days in a month
  const combinedProgressPercentage = totalAdsPosted / combinedGoal;

  // console.log('todaysProgress', data);

  return (
    <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
      <View style={tw`bg-[#edf2f2] flex-1`}>
        <ScrollView>
          <View style={tw`flex-1`}>
            <Header title="Your Progress " />
            <View style={{justifyContent: 'center'}}>
              <View style={styles.progressContainer}>
                <Text style={styles.progressLabel}>Daily Progress</Text>
                <Progress.Circle
                  progress={todaysProgress}
                  size={200}
                  color="black"
                  direction="clockwise"
                  borderWidth={20}
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
                  progress={combinedProgressPercentage}
                  size={200}
                  color="black"
                  direction="clockwise"
                  borderWidth={20}
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
        </ScrollView>
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
    // marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
  },
  progressLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  progressText: {
    fontSize: 16,
    marginTop: 5,
    color: 'black',
  },
});

export default ProgressGraph;
