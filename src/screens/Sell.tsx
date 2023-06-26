import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {color} from '../constants/Colors';
import {data} from '../data/test';

const {width, height} = Dimensions.get('window');
const Sell = () => {
  const [_data, setData] = useState();

  // console.log(data)
  const Header = () => (
    <View
      style={{
        height: 100,
        width: width,
        backgroundColor: color.white,
        justifyContent: 'flex-end',
        zIndex: 1000,
        marginBottom: 30,
      }}>
      <SafeAreaView>
        <Text
          style={{
            color: color.orange,
            fontSize: 23,
            fontWeight: '600',
            margin: 15,
          }}>
          Your Ads
        </Text>
      </SafeAreaView>
    </View>
  );

  return (
    <>
      {_data ? (
        <FlatList
          data={data}
          contentContainerStyle={{
            width: width,
            paddingBottom: 100,
            alignItems: 'center',
          }}
          numColumns={2}
          ListHeaderComponent={<Header />}
          keyExtractor={item => '#' + item.id}
          renderItem={({item}) => (
            <View
              style={{
                width: width / 2 - 30,
                height: 200,
                backgroundColor: 'white',
                marginTop: 10,
                marginHorizontal: 10,
                borderRadius: 10,
              }}></View>
          )}
        />
      ) : (
        <>
          <Header />
          <Text style={{alignSelf: 'center', color: 'black'}}>
            You have currently no ads listed
          </Text>
        </>
      )}
    </>
  );
};

export default Sell;

const styles = StyleSheet.create({});
