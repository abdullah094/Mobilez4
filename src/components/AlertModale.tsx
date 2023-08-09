import React, {useState} from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {Modal} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';

const AlertModale = ({onClose, message}) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Modal visible={isVisible}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            borderRadius: 20,
            paddingBottom: 16,
            top: '10%',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            alignItems: 'center',
            elevation: 4,
            position: 'absolute',
            zIndex: 999,
            backgroundColor: '#fff',
            width: '80%',
          }}>
          <Pressable
            onPress={() => {
              setIsVisible(false);
              onClose(false);
            }}
            style={{
              position: 'absolute',
              right: 0,
              top: -35,
              zIndex: 999,
              padding: 5,
            }}>
            <Entypo name={'circle-with-cross'} size={30} color={'black'} />
          </Pressable>
          <View
            style={{
              backgroundColor: '#015dcf',
              width: '100%',
              paddingVertical: 6,
              paddingHorizontal: 16,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 15}}>
              Confirm Action
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 16,
              marginTop: 16,
            }}>
            <Text style={{color: 'grey'}}>{message}</Text>
          </View>

          <TouchableOpacity
            style={{
              marginTop: 20,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
              backgroundColor: 'orange',
            }}
            onPress={() => {
              setIsVisible(false);
              onClose(false);
            }}>
            <Text style={{color: '#fff'}}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModale;
