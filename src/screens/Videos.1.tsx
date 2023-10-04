import {VIDEOS} from '@env';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './Videos';

export const Videos = ({navigation}) => {
  const [data, setData] = useState();

  const fetchData = () => {
    axios
      .get(VIDEOS)
      .then(response => {
        setData(response.data.videos);
        console.log(response.data.videos);
      })
      .catch(error => {
        Alert.alert('Failed');
        navigation.goBack();
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <Loading />;

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => Linking.openURL(item.video_link)}
      style={styles.videoCard}>
      <Image
        style={{width: 80, height: 80, marginBottom: 10}}
        source={require('../assets/video_logo.png')}
      />
      <Text style={styles.videoTitle} numberOfLines={2}>
        {item.video_link}
      </Text>
      <Text style={styles.videoTimestamp} numberOfLines={1}>
        {item.updated_at}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Quirky Videos</Text>
      </View>
      <FlatList
        data={data}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};
