import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useState, useEffect} from 'react';
import React from 'react';
import {FETCHMESSAGES, SENDMESSAGES, CONTACTS} from '@env';
import {selectAccessToken} from '../Redux/Slices';
import axios, {AxiosError} from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {Contact, Contacts, NewDevice} from '../../type';
import {logoutUser} from '../Redux/Slices';

import {GiftedChat} from 'react-native-gifted-chat';
import tw from 'twrnc';
const base_url = 'https://www.mobilezmarket.com/images/';
const ChatScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const accessToken = useSelector(selectAccessToken);
  const [data, setData] = useState<Contact[]>([]);
  const dispatch = useDispatch();

  const handleSend = newMessages => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
  };

  useEffect(() => {
    axios
      .post(
        CONTACTS,
        {
          key: 'YW1Gb1lXNTZZV2xpTG1GemJHRnRMbTFsYUdGeVFHZHRZV2xzTG1OdmJUcG1iMjlrWjJoaGNnPT0=',
        },
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      )
      .then(response => {
        const data: Contacts = response.data;
        setData(data.contacts);
      })
      .catch((reason: AxiosError) => {
        if (reason.response!.status === 401) {
          dispatch(logoutUser);
          navigation.navigate('Login');
        }
        console.log(reason.message);
      });
  }, []);
  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={{flex: 1}}>
        <FlatList
          data={data}
          key={'#'}
          keyExtractor={item => '#' + item.id}
          horizontal
          renderItem={({item}) => (
            <View style={tw`w-20 `}>
              <Image
                style={tw`w-10 h-10 rounded-full`}
                source={{uri: base_url + item.photo}}></Image>
              <Text numberOfLines={1}>{item.first_name}</Text>
            </View>
          )}
        />
        <GiftedChat
          messages={messages}
          // isTyping={true}
          showUserAvatar={false}
          onSend={newMessages => handleSend(newMessages)}
          user={{
            _id: 1,
            name: 'Abdullah',
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default ChatScreen;

const styles = StyleSheet.create({});
