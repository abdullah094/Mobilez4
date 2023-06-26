import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import tw from 'twrnc';
import Header from '../components/Header';
import {color} from '../constants/Colors';

const {width, height} = Dimensions.get('window');
const BlogDetails = ({navigation, route}) => {
  const {data} = route.params;
  console.log(data.title);
  const base_url = 'https://www.mobilezmarket.com/images/';

  const source = {
    html: data.description,
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
      <View style={tw`bg-[#edf2f2] flex-1`}>
        <Header title="Blog" />
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            marginTop: 50,
            paddingBottom: 50,
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
          <View style={tw` mx-16`}>
            <RenderHtml contentWidth={width} source={source} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default BlogDetails;

const styles = StyleSheet.create({});
