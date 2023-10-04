import React, {useEffect} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
// import {Modal} from 'react-native-paper';

const AlertModale = ({message, setMessage}) => {
  const [visible, setVisible] = React.useState(false);

  // const showDialog = () => setVisible(true);

  // const hideDialog = () => setMessage('');

  console.log(message);
  useEffect(() => {
    if (message == '') {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [message]);

  const onClose = () => {
    setMessage('');
  };

  return (
    <Modal
      visible={visible}
      style={{flex: 1}}
      animationType="fade"
      transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00000070',
        }}>
        <View
          style={{
            borderRadius: 10,
            paddingBottom: 16,
            top: '40%',
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
          {/* <Pressable
            onPress={onClose}
            style={{
              position: 'absolute',
              right: 0,
              top: -35,
              zIndex: 999,
              padding: 5,
            }}>
            <Entypo name={'circle-with-cross'} size={30} color={'black'} />
          </Pressable> */}
          <View
            style={{
              backgroundColor: '#015dcf',
              width: '100%',
              paddingVertical: 6,
              paddingHorizontal: 16,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: 15,
                textAlign: 'center',
              }}>
              Confirm Action
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 16,
              marginTop: 16,
            }}>
            <Text style={{color: 'black'}}>{message}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'center',
              marginTop: 15,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                paddingVertical: 5,
                paddingHorizontal: 20,
                borderRadius: 5,
                backgroundColor: 'orange',
                width: '40%',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black'}}>OK</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={onClose}
              style={{
                paddingVertical: 5,
                paddingHorizontal: 20,
                borderRadius: 5,
                backgroundColor: 'orange',
                width: '40%',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black'}}>Cancel</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </Modal>
    // <Portal>
    //   <Dialog visible={visible} onDismiss={hideDialog}>
    //     <Dialog.Title>Alert</Dialog.Title>
    //     <Dialog.Content>
    //       <PaperText variant="bodyMedium">{message}</PaperText>
    //     </Dialog.Content>
    //     <Dialog.Actions>
    //       <PaperButton onPress={hideDialog}>Cancel</PaperButton>
    //       <PaperButton onPress={hideDialog}>Done</PaperButton>
    //     </Dialog.Actions>
    //   </Dialog>
    // </Portal>
  );
};

export default AlertModale;
