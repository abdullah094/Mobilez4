import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import Header from '../components/Header';

const Histroy = () => {
  return (
    <SafeAreaView style={tw`flex-1 bg-[#015dcf]`}>
      <View style={tw`bg-[#edf2f2] flex-1`}>
        <ScrollView>
          <View style={tw`flex-1`}>
            <Header title="Histroy" />
            <View style={tw`flex-1 border-5`}>
              <View
                style={tw`flex-row flex-1 bg-slate-300 justify-between p-4`}>
                <Text style={tw`text-black font-bold`}>
                  Your Daily Ads Count
                </Text>
                <Text style={tw`text-black font-bold`}>Your Monthly Ads</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Histroy;
