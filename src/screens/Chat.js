import {StyleSheet, Text, View} from 'react-native';
import {useState, useEffect} from 'react';
import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = newMessages => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Agent',
        createdAt: new Date(Date.now()),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
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
