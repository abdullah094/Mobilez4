import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useContext} from 'react';
import Header from '../components/Header';
import {color} from '../constants/Colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {SelectList} from 'react-native-dropdown-select-list';
import {REGISTER} from '@env';
import axios from 'axios';
import Context from '../data/Context';

const {width, height} = Dimensions.get('window');
const SignUp = ({navigation, route}) => {
  const {city} = route.params;

  const [check, setCheck] = useState(false);
  const [registerButtonText, setRegisterButtonText] = useState('Register');
  const [selected, setSelected] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: city,
    acc_type: '',
    password: '',
    conf_password: '',
    terms: 1,
    area: '',
    shop_name: '',
    shop_address: '',
  });
  // console.log(formData)

  const {signUp} = useContext(Context);
  const data = [
    {key: '1', value: 'individual'},
    {key: '2', value: 'business'},
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
          signUp('', response.data.token);
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
    <ScrollView
      contentContainerStyle={styles.container}
      stickyHeaderHiddenOnScroll={true}
      // stickyHeaderIndices={[0]}
    >
      <Header header={'Register'} onPress={() => navigation.goBack()} />

      <View style={[styles.box, {marginTop: 100}]}>
        <Text style={styles.box_heading}>First Name</Text>
        <TextInput
          style={styles.box_input}
          value={formData.first_name}
          onChangeText={text => setFormData({...formData, first_name: text})}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.box_heading}>Last Name</Text>
        <TextInput
          style={styles.box_input}
          value={formData.last_name}
          onChangeText={text => setFormData({...formData, last_name: text})}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.box_heading}>Select City</Text>
        <TextInput
          style={styles.box_input}
          value={city}
          onFocus={() => navigation.navigate('CityList')}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.box_heading}>Phone Number</Text>
        <TextInput
          style={styles.box_input}
          keyboardType="number-pad"
          value={formData.phone}
          onChangeText={text => setFormData({...formData, phone: text})}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.box_heading}>Email</Text>
        <TextInput
          style={styles.box_input}
          keyboardType="email-address"
          value={formData.email}
          onChangeText={text =>
            setFormData({...formData, email: text.toLowerCase()})
          }
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.box_heading}>Password</Text>
        <TextInput
          style={styles.box_input}
          keyboardType="visible-password"
          value={formData.password}
          onChangeText={text =>
            setFormData({...formData, password: text.toLowerCase()})
          }
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.box_heading}>Confirm Password</Text>
        <TextInput
          style={styles.box_input}
          keyboardType="visible-password"
          value={formData.conf_password}
          onChangeText={text =>
            setFormData({...formData, conf_password: text.toLowerCase()})
          }
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.box_heading}>Select Account type</Text>
        <View style={{marginTop: 5}}>
          <SelectList
            setSelected={val => setFormData({...formData, acc_type: val})}
            data={data}
            save="value"
          />
        </View>
      </View>

      {formData.acc_type === 'business' && (
        <>
          <View style={styles.box}>
            <Text style={styles.box_heading}>Shop Name</Text>
            <TextInput
              style={styles.box_input}
              value={formData.shop_name}
              onChangeText={text => setFormData({...formData, shop_name: text})}
            />
          </View>

          <View style={styles.box}>
            <Text style={styles.box_heading}>Shop Address</Text>
            <TextInput
              style={styles.box_input}
              value={formData.shop_address}
              onChangeText={text =>
                setFormData({...formData, shop_address: text})
              }
            />
          </View>
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
            <MaterialIcon name="check" color={color.orange} size={24} />
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
          width: width - 50,
          height: 50,
          backgroundColor: color.orange,
          marginTop: 30,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
          {registerButtonText}
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
    fontSize: 15,
    marginLeft: 5,
  },
  box_input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    backgroundColor: color.white,
    borderRadius: 20,
    marginTop: 5,
    paddingHorizontal: 15,
  },
});
