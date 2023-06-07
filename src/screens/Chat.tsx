import {StyleSheet, Text, View} from 'react-native';
import {useState, useEffect} from 'react';
import React from 'react';
import {FETCHMESSAGES, CONTACTS} from '@env';
import {selectAccessToken} from '../Redux/Slices';
import axios, {AxiosError} from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {NewDevice} from '../../type';
import {logoutUser} from '../Redux/Slices';

import {GiftedChat} from 'react-native-gifted-chat';
const ChatScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const accessToken = useSelector(selectAccessToken);
  const [data, setData] = useState<NewDevice[]>([]);
  const dispatch = useDispatch();

  const handleSend = newMessages => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
  };

  useEffect(() => {
    axios
      .post(CONTACTS, {
        headers: {Authorization: `Bearer ${accessToken}`},
      })
      .then(response => {
        setData(response.data.data);
      })
      .catch((reason: AxiosError) => {
        if (reason.response!.status === 401) {
          dispatch(logoutUser);
          navigation.navigate('Login');
        }
        console.log(reason.message);
      });
    console.log('hello===============', CONTACTS);
  }, []);

  return (
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
  );
};
export default ChatScreen;

const styles = StyleSheet.create({});
