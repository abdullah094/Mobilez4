import {REGISTER} from '@env';
import axios from 'axios';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';
import Header from '../components/Header';
import {color} from '../constants/Colors';

const {width, height} = Dimensions.get('window');
const SignUp = ({navigation, route}) => {
  const {city} = route.params;

  const [check, setCheck] = useState(false);
  const [registerButtonText, setRegisterButtonText] = useState<any>('Register');
  const [selected, setSelected] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: 'Karachi',
    acc_type: '',
    password: '',
    conf_password: '',
    terms: 1,
    area: '',
    shop_name: '',
    shop_address: '',
  });
  // console.log(formData)

  const data = [
    {label: 'individual', value: 'individual'},
    {label: 'business', value: 'business'},
  ];

  const fetchData = async () => {
    setRegisterButtonText(
      <ActivityIndicator size="small" color={color.white} />,
    );
    axios
      .post(REGISTER, formData)
      .then(response => {
        if (response.data.errors) {
          console.log(response.data.errors);
          Alert.alert('email or phone is already present or missing fields');
          setRegisterButtonText('Register');
        } else {
          console.log(response.data);
          navigation.navigate('OTPScreen', {phone: formData.phone});
          setRegisterButtonText('Register');
        }
      })
      .catch(error => {
        console.log(error);
        setRegisterButtonText('Register');
      });
  };
  return (
    <SafeAreaView style={tw`flex-1`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`h-full items-center `}>
          <Header title="SignUp" />
          <Text style={tw`py-10 pt-20  text-black text-2xl  mx-10`}>
            Create your <Text style={tw`font-bold`}>Account</Text>
          </Text>
          <View style={tw`bg-white rounded-3x1 p-2 m-4 pb-12 `}>
            <TextInput
              style={styles.box_input}
              value={formData.first_name}
              placeholder="First name"
              textColor="black"
              onChangeText={text =>
                setFormData({...formData, first_name: text})
              }
            />

            <TextInput
              style={styles.box_input}
              value={formData.last_name}
              placeholder="Last name"
              textColor="black"
              onChangeText={text => setFormData({...formData, last_name: text})}
            />

            <TextInput
              style={styles.box_input}
              keyboardType="number-pad"
              placeholder="Phone number"
              textColor="black"
              value={formData.phone}
              onChangeText={text => setFormData({...formData, phone: text})}
            />

            <TextInput
              style={styles.box_input}
              keyboardType="email-address"
              placeholder="Email"
              textColor="black"
              value={formData.email}
              onChangeText={text =>
                setFormData({...formData, email: text.toLowerCase()})
              }
            />

            <TextInput
              style={styles.box_input}
              value={formData.password}
              placeholder="password"
              secureTextEntry={true}
              textColor="black"
              onChangeText={text =>
                setFormData({...formData, password: text.toLowerCase()})
              }
            />

            <TextInput
              style={styles.box_input}
              secureTextEntry={true}
              value={formData.conf_password}
              placeholder="confirm password"
              textColor="black"
              onChangeText={text =>
                setFormData({...formData, conf_password: text.toLowerCase()})
              }
            />

            <View style={tw`mt-1 `}>
              <DropDown
                inputProps={tw`bg-white w-full `}
                dropDownItemStyle={tw`bg-black`}
                placeholder="Account type"
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={formData.acc_type}
                setValue={val => setFormData({...formData, acc_type: val})}
                list={data}
              />
            </View>

            {formData.acc_type === 'business' && (
              <>
                <TextInput
                  style={styles.box_input}
                  value={formData.shop_name}
                  placeholder="shop name"
                  textColor="black"
                  onChangeText={text =>
                    setFormData({...formData, shop_name: text})
                  }
                />

                <TextInput
                  style={styles.box_input}
                  value={formData.shop_address}
                  placeholder="shop address"
                  textColor="black"
                  onChangeText={text =>
                    setFormData({...formData, shop_address: text})
                  }
                />
              </>
            )}

            <View
              style={{
                flexDirection: 'row',
                width: width - 40,
                marginTop: 30,
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => setCheck(!check)}
                style={{
                  marginLeft: 10,
                  borderWidth: 1,
                  width: 25,
                  height: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                {check && (
                  <MaterialIcon name="check" color={color.orange} size={23} />
                )}
              </Pressable>
              <Text style={{marginLeft: 5, color: color.black}}>
                I have read and accept terms and conditions.
              </Text>
            </View>
            <TouchableOpacity
              disabled={!check}
              onPress={fetchData}
              style={{
                height: 50,
                backgroundColor: color.orange,
                marginTop: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 25,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
                {registerButtonText}
              </Text>
            </TouchableOpacity>
            {/* <Text style={tw`my-5 self-center`}>Or</Text> */}
          </View>
          <View style={tw`flex flex-row justify-center w-full bottom-3  z-20 `}>
            {/* <TouchableOpacity style={styles.social_buttons}>
              <Image style={tw`h-4 w-2`} source={require('../assets/F.png')} />
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={[styles.social_buttons, tw`bg-[#DC4E41]`]}>
              <Image
                style={tw`h-4 w-4`}
                source={require('../assets/Gpng.png')}
              />
              <Image
                style={tw`h-2 w-2`}
                source={require('../assets/plus.png')}
              />
            </TouchableOpacity> */}
          </View>

          <View style={tw`flex-row items-center my-5`}>
            <Text style={tw`text-gray-500`}>Already have account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={tw`text-black mx-1`}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    alignItems: 'center',
    // backgroundColor:color.white
  },
  box: {
    width: width - 40,
    marginTop: 15,
  },
  box_heading: {
    color: color.black,
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 5,
  },
  box_input: {
    height: 50,
    fontSize: 12,
    borderColor: 'gray',
    backgroundColor: 'white',
    marginTop: 5,
  },
  social_buttons: tw`bg-[#3B5998] h-11 w-11 mx-4 rounded-full top--6 justify-center items-center flex-row `,
});
