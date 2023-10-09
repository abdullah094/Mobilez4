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
        <Header title="Blog Detail" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            marginTop: 20,
            paddingBottom: 100,
          }}>
          <View
            style={{
              alignContent: 'center',
              justifyContent: 'center',
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
          </View>
          <View style={{width: '100%', height: '10%', marginTop: 10}}>
            <Image
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="contain"
              source={{uri: base_url + data.image}}
            />
          </View>

          <View style={tw` mx-16 top-5`}>
            {/* <WebView
              originWhitelist={['*']}
              source={source}
              style={{height: 300, width: '100%'}}
            /> */}
            <RenderHtml contentWidth={width} source={source} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default BlogDetails;

const styles = StyleSheet.create({});
