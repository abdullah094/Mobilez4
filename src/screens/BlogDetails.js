import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {color} from '../constants/Colors';
import RenderHtml from 'react-native-render-html';

const {width, height} = Dimensions.get('window');
const BlogDetails = ({navigation, route}) => {
  const {data} = route.params;
  console.log(data.title);
  const base_url = 'https://www.mobilezmarket.com/images/';

  const source = {
    html: data.description,
  };
  return (
    <SafeAreaView>
      <Header title="Blog" />
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          marginTop: 100,
          paddingBottom: 100,
        }}>
        <Text
          style={{
            color: color.black,
            fontSize: 18,
            marginHorizontal: 20,
            fontWeight: 'bold',
          }}
          numberOfLines={1}>
          {data.title}
        </Text>
        <Image
          style={{width: 300, height: 150, marginTop: 10}}
          source={{uri: base_url + data.image}}
        />
        <View style={{marginHorizontal: 20, marginTop: 10}}>
          <RenderHtml contentWidth={width} source={source} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BlogDetails;

const styles = StyleSheet.create({});
