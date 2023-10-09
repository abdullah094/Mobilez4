import {CONTACTS, FETCH_MESSAGES, SEND_MESSAGES} from '@env';
import {useRoute} from '@react-navigation/native';
import axios, {AxiosError} from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import tw from 'twrnc';
import {logoutUser, selectAccessToken} from '../Redux/Slices';
import {Contact, Contacts, FetchMessage} from '../types';
const {width, height} = Dimensions.get('window');
const base_url = 'https://www.mobilezmarket.com/images/';
interface User {
  id: number;
  name: string;
  photo: string;
  phone: number;
}
interface messages {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar: string | null;
  };
}
const ChatScreen = ({navigation}) => {
  const route = useRoute();
  const [message, setMessages] = useState<messages[]>([]);
  const accessToken = useSelector(selectAccessToken);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const params = route.params as {to: User};
  console.log('========', params?.to);
  const [from_id, setFrom_id] = useState(1);
  const [to_id, setTo_id] = useState(2);
  const [id, setId] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const onRefreshChat = () => {
    setRefreshing(true);
    fetchMessages();
  };

  const sendMessageToServer = (body: messages[]) => {
    if (!body) return;
    axios
      .post(
        SEND_MESSAGES,
        {
          key: 'YW1Gb 1lXNTZZV2xpTG1GemJHRnRMbTFsYUdGeVFHZHRZV2xzTG1OdmJUcG1iMjlrWjJoaGNnPT0=',
          type: 'sender',
          from_id: from_id,
          // to_id: to_id,
          id: to_id,

          body: body[0]?.text,
          message: body[0]?.text,
          // body: body[0]?.text,
        },
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      )
      .then(response => {
        const data = response.data;
        // setMessages(data.c);
        console.log('data from api', data);
        fetchMessages();
      })
      .catch((reason: AxiosError) => {
        if (reason.response!.status === 401) {
          dispatch(logoutUser);
          navigation.navigate('Login');
        }
        console.log(reason.message);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, [to_id]);

  setTimeout(() => {
    console.log('Fetching new Messages');
    fetchMessages();
  }, 1000);

  const fetchMessages = () => {
    // setMessages([])
    console.log(FETCH_MESSAGES);

    axios
      .post(
        FETCH_MESSAGES,
        {
          key: 'YW1Gb 1lXNTZZV2xpTG1GemJHRnRMbTFsYUdGeVFHZHRZV2xzTG1OdmJUcG1iMjlrWjJoaGNnPT0=',
          id: to_id,
        },
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      )
      .then(response => {
        const data: FetchMessage = response.data;
        const existingId = message.map(x => x._id);
        const newID = data.messages.filter(x => !existingId.includes(x.id));
        if (newID.length == 0) return;
        setRefreshing(false);
        setMessages(
          data.messages.map((x, index) => {
            if (index == 0) {
              setFrom_id(to_id == x.from_id ? x.from_id : x.from_id);
            }
            return {
              _id: x.id,
              text: x.body,
              createdAt: new Date(x.created_at),
              user: {
                _id: x.from_id,
                name: '',
                avatar: 'https://placeimg.com/140/140/any',
              },
              sent: x.seen != 0,
            };
          }),
        );
      })
      .catch((reason: AxiosError) => {
        if (reason.response!.status === 401) {
          dispatch(logoutUser);
          navigation.navigate('Login');
        }
        console.log(reason?.message);
        setRefreshing(false);
      });
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

        if (params?.to) {
          console.log('params here', [
            ...data.contacts,
            {id: params?.to.id, name: params?.to.name, photo: params?.to.phone},
          ]);
          const contact = [
            ...data.contacts,
            {
              id: params?.to.id,
              first_name: params?.to.name,
              photo: params?.to.photo,
            },
          ];
          const arrayUniqueByKey = [
            ...new Map(contact.map(item => [item.id, item])).values(),
          ];
          setContacts(arrayUniqueByKey);
          setTo_id(params?.to.id);
        } else {
          setContacts(data.contacts);
          if (data.contacts?.length > 0) {
            setTo_id(data.contacts[0].id);
          }
        }
        //
      })
      .catch((reason: AxiosError) => {
        if (reason.response!.status === 401) {
          dispatch(logoutUser);
          // navigation.navigate('Login');
        }
        console.log(reason?.message);
      });
  }, [route, accessToken]);
  return (
    <SafeAreaView style={tw`flex-1`}>
      {contacts?.length === 0 && accessToken && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'black', fontWeight: '700', fontSize: 16}}>
            You haven't Chated to anyone
          </Text>
        </View>
      )}
      {!accessToken ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'black', fontWeight: '700', fontSize: 16}}>
            Please Log in to see your chat
          </Text>
        </View>
      ) : (
        <>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <FlatList
              data={contacts}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <TouchableOpacity onPress={() => setTo_id(item.id)}>
                  <View
                    style={tw`w-[70px] items-center justify-center m-2 shadow-md rounded-lg bg-white p-2`}>
                    <Image
                      style={tw`w-10  h-10  rounded-full border-red-600 ${
                        to_id === item.id ? 'border-2' : 'border-0'
                      }`}
                      resizeMode="contain"
                      source={
                        item.photo
                          ? {
                              uri: item.photo.includes('http')
                                ? item.photo
                                : base_url + item.photo,
                            }
                          : require('../assets/mobile-logo.png')
                      }
                    />
                    <Text
                      style={{fontSize: 12, fontWeight: '500', color: 'black'}}
                      numberOfLines={1}>
                      {item.first_name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>

          <GiftedChat
            onRefresh={() => onRefreshChat()}
            refreshing={refreshing}
            messages={message}
            showUserAvatar={false}
            placeholder="Type text here"
            renderUsernameOnMessage={true}
            isLoadingEarlier={true}
            alwaysShowSend={true}
            optionTintColor="black"
            // loadEarlier={true}
            isKeyboardInternallyHandled={true}
            // isLoadingEarlier={true}
            // isTyping={true}
            textInputStyle={tw`text-black`}
            onSend={newMessages => {
              onSend(newMessages), sendMessageToServer(newMessages);
            }}
            user={{
              _id: from_id,
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
