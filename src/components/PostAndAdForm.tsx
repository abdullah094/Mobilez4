//@ts-ignore
import {BRANDS, MODELS} from '@env';
import axios from 'axios';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, TextInput, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {
  ActivityIndicator,
  Checkbox,
  HelperText,
  Text,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import tw from 'twrnc';
import {selectAccessToken, selectProfileData} from '../Redux/Slices';
import {color} from '../constants/Colors';
import {BrandAPI, Form, ModelAPI, Profile} from '../types';

const width = Dimensions.get('window').width;

const RamData = [
  {label: '1 GB', value: '1'},
  {label: '2 GB', value: '2'},
  {label: '4 GB', value: '4'},
  {label: '6 GB', value: '6'},
  {label: '8 GB', value: '8'},
  {label: '12 GB', value: '12'},
];
const StorageData = [
  {label: '4 GB', value: '4'},
  {label: '8 GB', value: '8'},
  {label: '16 GB', value: '16'},
  {label: '32 GB', value: '32'},
  {label: '64 GB', value: '64'},
  {label: '128 GB', value: '128'},
  {label: '256 GB', value: '256'},
  {label: '512 GB', value: '512'},
  {label: '1 TB', value: '1024'},
];
const WarrantyData = [
  {label: 'No Warranty', value: 'No Warranty'},
  {label: '1 month', value: '1 month'},
  {label: '2 months', value: '2 months'},
  {label: '3 months', value: '3 months'},
  {label: '4 months', value: '4 months'},
  {label: '5 months', value: '5 months'},
  {label: '6 months', value: '6 months'},
  {label: '7 months', value: '7 months'},
  {label: '8 months', value: '8 months'},
  {label: '9 months', value: '9 months'},
  {label: '10 months', value: '10 months'},
  {label: '11 months', value: '11 months'},
  {label: '12 months', value: '12 months'},
];
const ConditionData = [
  {label: 'New', value: 'New'},
  {label: 'Used', value: 'Used'},
  {label: 'Refurbished', value: 'Refurbished'},
];
const CategoryData = [
  {label: 'Mobile', value: 'Mobile'},
  {label: 'Tablet', value: 'Tablet'},
  {label: 'Watch', value: 'Watch'},
];
const AccountStatusData = [
  {label: 'Approved', value: 'Approved'},
  {label: 'Not Approved', value: 'Not Approved'},
];
const CityData = [
  {label: 'Karachi', value: 'Karachi'},
  {label: 'Lahore', value: 'Lahore'},
  {label: 'Islamabad', value: 'Islamabad'},
  {label: 'Faisalabad', value: 'Faisalabad'},
  {label: 'Rawalpindi', value: 'Rawalpindi'},
  {label: 'Multan', value: 'Multan'},
  {label: 'Gujranwala', value: 'Gujranwala'},
  {label: 'Peshawar', value: 'Peshawar'},
  {label: 'Quetta', value: 'Quetta'},
  {label: 'Sialkot', value: 'Sialkot'},
  {label: 'Gujrat', value: 'Gujrat'},
  {label: 'Bahawalpur', value: 'Bahawalpur'},
  {label: 'Sargodha', value: 'Sargodha'},
  {label: 'Sukkur', value: 'Sukkur'},
  {label: 'Jhang', value: 'Jhang'},
  {label: 'Larkana', value: 'Larkana'},
  {label: 'Sheikhupura', value: 'Sheikhupura'},
  {label: 'Rahim Yar Khan', value: 'Rahim Yar Khan'},
  {label: 'Chiniot', value: 'Chiniot'},
  {label: 'Sahiwal', value: 'Sahiwal'},
  {label: 'Mardan', value: 'Mardan'},
  {label: 'Kasur', value: 'Kasur'},
  {label: 'Dera Ghazi Khan', value: 'Dera Ghazi Khan'},
  {label: 'Nawabshah', value: 'Nawabshah'},
  {label: 'Mingora', value: 'Mingora'},
  {label: 'Okara', value: 'Okara'},
  {label: 'Mirpur Khas', value: 'Mirpur Khas'},
  {label: 'Chiniot', value: 'Chiniot'},
  {label: 'Kamoke', value: 'Kamoke'},
  {label: 'Sadiqabad', value: 'Sadiqabad'},
  {label: 'Burewala', value: 'Burewala'},
  {label: 'Jhelum', value: 'Jhelum'},
  {label: 'Kohat', value: 'Kohat'},
  {label: 'Khanewal', value: 'Khanewal'},
  {label: 'Dera Ismail Khan', value: 'Dera Ismail Khan'},
  {label: 'Gojra', value: 'Gojra'},
  {label: 'Bahawalnagar', value: 'Bahawalnagar'},
  {label: 'Muridke', value: 'Muridke'},
  {label: 'Pakpattan', value: 'Pakpattan'},
  {label: 'Abottabad', value: 'Abottabad'},
  {label: 'Tando Adam', value: 'Tando Adam'},
  {label: 'Jaranwala', value: 'Jaranwala'},
  {label: 'Khairpur', value: 'Khairpur'},
  {label: 'Chishtian', value: 'Chishtian'},
  {label: 'Daska', value: 'Daska'},
  {label: 'Mandi Bahauddin', value: 'Mandi Bahauddin'},
  {label: 'Ahmedpur East', value: 'Ahmedpur East'},
  {label: 'Kamalia', value: 'Kamalia'},
  {label: 'Tando Allahyar', value: 'Tando Allahyar'},
  {label: 'Khuzdar', value: 'Khuzdar'},
  {label: 'Vihari', value: 'Vihari'},
  {label: 'Attock', value: 'Attock'},
  {label: 'Badin', value: 'Badin'},
  {label: 'Sanghar', value: 'Sanghar'},
  {label: 'Nankana Sahib', value: 'Nankana Sahib'},
  {label: 'Hafizabad', value: 'Hafizabad'},
  {label: 'Kotli', value: 'Kotli'},
  {label: 'Lodhran', value: 'Lodhran'},
  {label: 'Nowshera', value: 'Nowshera'},
  {label: 'Charsadda', value: 'Charsadda'},
  {label: 'Jamshoro', value: 'Jamshoro'},
  {label: 'Kandhkot', value: 'Kandhkot'},
  {label: 'Mianwali', value: 'Mianwali'},
  {label: 'Hassan Abdal', value: 'Hassan Abdal'},
  {label: 'Muzaffargarh', value: 'Muzaffargarh'},
  {label: 'Toba Tek Singh', value: 'Toba Tek Singh'},
  {label: 'Jhang Sadr', value: 'Jhang Sadr'},
  {label: 'Khairpur Mir’s', value: 'Khairpur Mir’s'},
  {label: 'Narowal', value: 'Narowal'},
  {label: 'Shakargarh', value: 'Shakargarh'},
  {label: 'Hujra', value: 'Hujra'},
  {label: 'Kabirwala', value: 'Kabirwala'},
  {label: 'Kasur', value: 'Kasur'},
  {label: 'Mansehra', value: 'Mansehra'},
  {label: 'Layyah', value: 'Layyah'},
  {label: 'Kambar', value: 'Kambar'},
  {label: 'Moro', value: 'Moro'},
  {label: 'Mianwali', value: 'Mianwali'},
  {label: 'Turbat', value: 'Turbat'},
  {label: 'Shahdadkot', value: 'Shahdadkot'},
  {label: 'Nawabshah', value: 'Nawabshah'},
  {label: 'Dadu', value: 'Dadu'},
  {label: 'Ali Pur', value: 'Ali Pur'},
  {label: 'Lodhran', value: 'Lodhran'},
  {label: 'Kotli', value: 'Kotli'},
  {label: 'Loralai', value: 'Loralai'},
  {label: 'Dera Allahyar', value: 'Dera Allahyar'},
  {label: 'Pakpattan', value: 'Pakpattan'},
  {label: 'Sehwan', value: 'Sehwan'},
  {label: 'Chaman', value: 'Chaman'},
  {label: 'Tando Jam', value: 'Tando Jam'},
  {label: 'Kandiaro', value: 'Kandiaro'},
  {label: 'Kunjah', value: 'Kunjah'},
  {label: 'Sahiwal', value: 'Sahiwal'},
  {label: 'Kamber', value: 'Kamber'},
  {label: 'Malakand', value: 'Malakand'},
  {label: 'Mithi', value: 'Mithi'},
  {label: 'Ziarat', value: 'Ziarat'},
  {label: 'Loralai', value: 'Loralai'},
  {label: 'Dera Murad Jamali', value: 'Dera Murad Jamali'},
  {label: 'Kohlu', value: 'Kohlu'},
  {label: 'Gwadar', value: 'Gwadar'},
  {label: 'Dera Bugti', value: 'Dera Bugti'},
  {label: 'Tando Allahyar', value: 'Tando Allahyar'},
  {label: 'Kot Addu', value: 'Kot Addu'},
  {label: 'Turbat', value: 'Turbat'},
  {label: 'Dullewala', value: 'Dullewala'},
  {label: 'Shahkot', value: 'Shahkot'},
  {label: 'Harunabad', value: 'Harunabad'},
  {label: 'Pattoki', value: 'Pattoki'},
  {label: 'Mamu Kanjan', value: 'Mamu Kanjan'},
  {label: 'Jalalpur', value: 'Jalalpur'},
  {label: 'Bhai Pheru', value: 'Bhai Pheru'},
  {label: 'Kabirwala', value: 'Kabirwala'},
  {label: 'Kot Radha Kishan', value: 'Kot Radha Kishan'},
  {label: 'Hujra', value: 'Hujra'},
  {label: 'Pindi Bhattian', value: 'Pindi Bhattian'},
  {label: 'Khalabat', value: 'Khalabat'},
  {label: 'Narang', value: 'Narang'},
  {label: 'Topi', value: 'Topi'},
  {label: 'Kamra', value: 'Kamra'},
  {label: 'Mitha Tiwana', value: 'Mitha Tiwana'},
  {label: 'Basirpur', value: 'Basirpur'},
  {label: 'Naushahro Feroze', value: 'Naushahro Feroze'},
  {label: 'Tando Muhammad Khan', value: 'Tando Muhammad Khan'},
  {label: 'Haripur', value: 'Haripur'},
  {label: 'Shikarpur', value: 'Shikarpur'},
  {label: 'Bhakkar', value: 'Bhakkar'},
  {label: 'Kharian', value: 'Kharian'},
  {label: 'Lala Musa', value: 'Lala Musa'},
  {label: 'Kasur', value: 'Kasur'},
  {label: 'Mian Channun', value: 'Mian Channun'},
  {label: 'Kundian', value: 'Kundian'},
  {label: 'Bhawana', value: 'Bhawana'},
  {label: 'Dajal', value: 'Dajal'},
  {label: 'Chawinda', value: 'Chawinda'},
  {label: 'Qadirpur Ran', value: 'Qadirpur Ran'},
  {label: 'Tandlianwala', value: 'Tandlianwala'},
  {label: 'Khewra', value: 'Khewra'},
  {label: 'Kahror Pakka', value: 'Kahror Pakka'},
  {label: 'Toba Tek Singh', value: 'Toba Tek Singh'},
  {label: 'Tando Qaiser', value: 'Tando Qaiser'},
  {label: 'Khairpur Nathan Shah', value: 'Khairpur Nathan Shah'},
  {label: 'Gujar Khan', value: 'Gujar Khan'},
  {label: 'Haripur', value: 'Haripur'},
  {label: 'Ghotki', value: 'Ghotki'},
  {label: 'Sarai Alamgir', value: 'Sarai Alamgir'},
  {label: 'Pir Mahal', value: 'Pir Mahal'},
  {label: 'Dinga', value: 'Dinga'},
  {label: 'Jampur', value: 'Jampur'},
  {label: 'Mangla', value: 'Mangla'},
  {label: 'Qadirpur Ran', value: 'Qadirpur Ran'},
  {label: 'Pishin', value: 'Pishin'},
  {label: 'Kahna', value: 'Kahna'},
  {label: 'Mianwali', value: 'Mianwali'},
  {label: 'Samundri', value: 'Samundri'},
  {label: 'Renala Khurd', value: 'Renala Khurd'},
  {label: 'Kahuta', value: 'Kahuta'},
  {label: 'Mehar', value: 'Mehar'},
  {label: 'Narowal', value: 'Narowal'},
  {label: 'Khushab', value: 'Khushab'},
  {label: 'Gandava', value: 'Gandava'},
  {label: 'Khairpur', value: 'Khairpur'},
  {label: 'Shahdadpur', value: 'Shahdadpur'},
  {label: 'Matiari', value: 'Matiari'},
  {label: 'Sibi', value: 'Sibi'},
  {label: 'Muzaffarabad', value: 'Muzaffarabad'},
  {label: 'Chaman', value: 'Chaman'},
  {label: 'Miran Shah', value: 'Miran Shah'},
  {label: 'Uthal', value: 'Uthal'},
  {label: 'Moro', value: 'Moro'},
  {label: 'Tump', value: 'Tump'},
  {label: 'Shahpur', value: 'Shahpur'},
  {label: 'Sakrand', value: 'Sakrand'},
  {label: 'Sehwan Sharif', value: 'Sehwan Sharif'},
  {label: 'Khairpur Tamewali', value: 'Khairpur Tamewali'},
  {label: 'Topi', value: 'Topi'},
  {label: 'Leiah', value: 'Leiah'},
  {label: 'Mingora', value: 'Mingora'},
  {label: 'Ghakhar Mandi', value: 'Ghakhar Mandi'},
  {label: 'Tando Ghulam Ali', value: 'Tando Ghulam Ali'},
  {label: 'Thatta', value: 'Thatta'},
  {label: 'Kandhkot', value: 'Kandhkot'},
  {label: 'Hattar', value: 'Hattar'},
  {label: 'Arifwala', value: 'Arifwala'},
  {label: 'Bannu', value: 'Bannu'},
  {label: 'Parachinar', value: 'Parachinar'},
  {label: 'Gakuch', value: 'Gakuch'},
  {label: 'Hangu', value: 'Hangu'},
  {label: 'Timargara', value: 'Timargara'},
  {label: 'Gwadar', value: 'Gwadar'},
  {label: 'Kalat', value: 'Kalat'},
  {label: 'Gandawa', value: 'Gandawa'},
  {label: 'Rakhni', value: 'Rakhni'},
  {label: 'Loralai', value: 'Loralai'},
  {label: 'Gaddani', value: 'Gaddani'},
  {label: 'Kulachi', value: 'Kulachi'},
  {label: 'Zaida', value: 'Zaida'},
  {label: 'Jand', value: 'Jand'},
  {label: 'Lachi', value: 'Lachi'},
  {label: 'Havelian', value: 'Havelian'},
  {label: 'Ladhewala Waraich', value: 'Ladhewala Waraich'},
  {label: 'Kamoke', value: 'Kamoke'},
  {label: 'Matiari', value: 'Matiari'},
  {label: 'Nankana Sahib', value: 'Nankana Sahib'},
  {label: 'Kundian', value: 'Kundian'},
  {label: 'Renala Khurd', value: 'Renala Khurd'},
  {label: 'Risalpur', value: 'Risalpur'},
  {label: 'Kot Mumin', value: 'Kot Mumin'},
  {label: 'Kamra', value: 'Kamra'},
  {label: 'Pindi Bhattian', value: 'Pindi Bhattian'},
  {label: 'Ghakhar Mandi', value: 'Ghakhar Mandi'},
  {label: 'Gojra', value: 'Gojra'},
  {label: 'Makhdumpur', value: 'Makhdumpur'},
  {label: 'Khurrianwala', value: 'Khurrianwala'},
  {label: 'Gurjaani', value: 'Gurjaani'},
];
const AccountTypeData = [
  {label: 'individual', value: 'individual'},
  {label: 'business', value: 'business'},
];

export default function PostAndAdForm({
  form,
  setForm,
  reset,
}: {
  form: Form;
  setForm: Dispatch<SetStateAction<Form>>;
  reset: number;
}) {
  const _accessToken = useSelector(selectAccessToken);
  const profileData = useSelector(selectProfileData) as Profile;
  const [brands, setBrands] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [models, setModels] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [loadingBrand, setLoadingBrand] = useState(false);
  const [loadingModel, setLoadingModel] = useState(false);
  // const [form, setForm] = useState<Form | null>(null);

  const [toggleAccessories, setToggleAccessories] = useState<{
    box: {
      label: string;
      value: string;
      Selected: boolean;
    };
    charger: {
      label: string;
      value: string;
      Selected: boolean;
    };
    data_cable: {
      label: string;
      value: string;
      Selected: boolean;
    };
    handfree: {
      label: string;
      value: string;
      Selected: boolean;
    };
    kit_only: {
      label: string;
      value: string;
      Selected: boolean;
    };
  }>({
    box: {label: 'Box', value: 'box', Selected: false},
    charger: {label: 'Charger', value: 'charger', Selected: false},
    data_cable: {label: 'Data Cable', value: 'data cable', Selected: false},
    handfree: {label: 'HandsFree', value: 'handfree', Selected: false},
    kit_only: {label: 'Kit Only', value: 'kit only', Selected: false},
  });
  useEffect(() => {
    setForm(prev => ({
      ...prev,
      accessories: Object.values(toggleAccessories)
        .filter(x => x.Selected)
        .map(x => x.label)
        .toString(),
    }));
  }, [toggleAccessories]);

  const getBrandFunc = () => {
    setLoadingBrand(true);
    setForm(prev => ({
      ...prev,
      //   brand: 'Other',
      isOtherBrand: false,
      model: '',
      isOtherModel: false,
    }));
    axios
      .get(BRANDS, {
        headers: {Authorization: `Bearer ${_accessToken}`},
      })
      .then(response => {
        const data: BrandAPI = response.data;
        let brands = data.brands
          .filter(x => x.category == form.category)
          .map(y => {
            return {label: y.title, value: y.title};
          });
        setBrands(brands);
        setLoadingBrand(false);
      })
      .catch(error => {
        console.log('Brands ' + error);
        setLoadingBrand(false);
      });
  };

  const getModelFunc = () => {
    setLoadingModel(true);
    const api = MODELS + form.brand;
    axios
      .get(api, {
        headers: {Authorization: `Bearer ${_accessToken}`},
      })
      .then(response => {
        const data: ModelAPI = response.data;
        const models = data.models.map(y => {
          return {label: y.model_name, value: y.model_name};
        });
        setModels(models);
        setLoadingModel(false);
      })
      .catch(error => {
        console.log('Brands ' + error);
        setLoadingModel(false);
      });
  };

  useEffect(() => {
    getBrandFunc();
  }, [form.category]);
  useEffect(() => {}, []);
  useEffect(() => {
    getModelFunc();
  }, [form.brand]);

  console.log(toggleAccessories);
  return (
    <View>
      <View style={tw`flex-row flex-wrap`}>
        <View style={tw`w-1/2 pt-2 pr-2`}>
          <SelectList
            boxStyles={styles.box}
            key={reset}
            // searchPlaceholder={
            //   CategoryData[
            //     CategoryData.map(x => x.value).indexOf(form.category)
            //   ]
            // }
            placeholder="Category"
            inputStyles={{color: 'black'}}
            setSelected={val => {
              setForm({...form, category: val});
            }}
            data={CategoryData}
            save="value"
            dropdownTextStyles={{color: 'black'}}
          />

          {/* <DropDown
            label={'Choose Category'}
            mode={'outlined'}
            visible={form.isCategoryVisible}
            showDropDown={() =>
              setForm(prev => ({...prev, isCategoryVisible: true}))
            }
            onDismiss={() =>
              setForm(prev => ({...prev, isCategoryVisible: false}))
            }
            value={form.category}
            setValue={text => setForm(prev => ({...prev, category: text}))}
            list={CategoryData}
            inputProps={{
              right: <TextInput.Icon icon={'menu-down'} />,
            }}
          /> */}
          {form.errorCategory != '' && (
            <HelperText type="error" visible={form.errorCategory != ''}>
              {form.errorCategory}
            </HelperText>
          )}
        </View>
        {loadingBrand ? (
          <ActivityIndicator style={tw`w-1/2 h-16`} size={30} />
        ) : (
          <View style={tw`w-1/2 pt-2 pl-2`}>
            <SelectList
              boxStyles={styles.box}
              key={reset}
              placeholder="Choose Brand"
              inputStyles={{
                color: 'black',
                // fontFamily: 'Geologica_Auto-Black',
              }}
              setSelected={text => {
                setForm(prev => ({
                  ...prev,
                  brand:
                    text === 'Other' || text === 'Other tablet' ? '' : text,
                  isOtherModel: text === 'Other' || text === 'Other tablet',
                  isOtherBrand: text === 'Other' || text === 'Other tablet',
                }));
              }}
              data={brands}
              save="value"
              dropdownTextStyles={{color: 'black'}}
            />
            {/* <DropDown
              label={'Choose Brand'}
              mode={'outlined'}
              visible={form.isBrandVisible}
              showDropDown={() =>
                setForm(prev => ({...prev, isBrandVisible: true}))
              }
              onDismiss={() =>
                setForm(prev => ({...prev, isBrandVisible: false}))
              }
              value={form.isOtherBrand ? 'Other' : form.brand}
              setValue={text =>
                setForm(prev => ({
                  ...prev,
                  brand:
                    text === 'Other' || text === 'Other tablet' ? '' : text,
                  isOtherModel: text === 'Other' || text === 'Other tablet',
                  isOtherBrand: text === 'Other' || text === 'Other tablet',
                }))
              }
              list={brands}
              accessibilityLabel={'Brand'}
              inputProps={{
                right: <TextInput.Icon icon={'menu-down'} />,
              }}
            /> */}
            {form.errorBrand != '' && (
              <HelperText type="error" visible={form.errorBrand != ''}>
                {form.errorBrand}
              </HelperText>
            )}
          </View>
        )}
        {form.isOtherBrand && (
          <View style={tw`w-full  pt-2`}>
            {/* <TextInput
              placeholder="Enter your Brand"
              value={form.brand}
              onChangeText={text =>
                setForm(prev => ({...prev, brand: text}))
              }></TextInput> */}
            <TextInput
              placeholder="Enter Your brand"
              placeholderTextColor={'gray'}
              style={styles.box_input}
              onChangeText={text => {
                {
                  setForm(prev => ({...prev, brand: text}));
                }
              }}
            />
            {form.errorBrand != '' && (
              <HelperText type="error" visible={form.errorBrand != ''}>
                {form.errorBrand}
              </HelperText>
            )}
          </View>
        )}

        {form.isOtherModel ||
        form.category === 'Tablet' ||
        form.category === 'Watch' ? (
          <View style={tw`w-full  pt-2`}>
            <TextInput
              placeholder="Enter Your Product Model"
              placeholderTextColor={'gray'}
              style={styles.box_input}
              onChangeText={text => {
                {
                  setForm({...form, model: text});
                }
              }}
            />
            {form.errorModel != '' && (
              <HelperText type="error" visible={form.errorModel != ''}>
                {form.errorModel}
              </HelperText>
            )}
          </View>
        ) : (
          <View style={tw`w-full  pt-2`}>
            {/* <SelectList
                  boxStyles={styles.box}
                   key={reset}
                  placeholder="Choose model"
                  inputStyles={{color: 'black'}}
                  setSelected={text => {
                    setForm(prev => ({
                      ...prev,
                      model: text === 'Other' ? '' : text,
                      isOtherModel: text === 'Other',
                    }));
                  }}
                  data={models}
                  save="value"
                  dropdownTextStyles={{color: 'black'}}
                /> */}
            <TextInput
              placeholder="Enter Your Product Model"
              value={form.model ?? ''}
              placeholderTextColor={'gray'}
              style={styles.box_input}
              onChangeText={text => {
                setForm(prev => ({
                  ...prev,
                  model: text === 'Other' ? '' : text,
                  isOtherModel: text === 'Other',
                }));
              }}
            />

            {/* <DropDown
                  label={'Model'}
                  mode={'outlined'}
                  visible={form.isOtherModel || form.isModelVisible}
                  showDropDown={() =>
                    setForm(prev => ({...prev, isModelVisible: true}))
                  }
                  onDismiss={() =>
                    setForm(prev => ({...prev, isModelVisible: false}))
                  }
                  value={form.model}
                  setValue={text =>
                    setForm(prev => ({
                      ...prev,
                      model: text === 'Other' ? '' : text,
                      isOtherModel: text === 'Other',
                    }))
                  }
                  list={models}
                  accessibilityLabel={'Model'}
                  inputProps={{
                    right: <TextInput.Icon icon={'menu-down'} />,
                  }}
                /> */}
            {form.errorModel != '' && (
              <HelperText type="error" visible={form.errorModel != ''}>
                {form.errorModel}
              </HelperText>
            )}
          </View>
        )}

        <View style={tw`w-1/2 pt-2 pr-2`}>
          <TextInput
            selectTextOnFocus={true}
            style={styles.box_input}
            keyboardType="number-pad"
            placeholder="Enter Price"
            placeholderTextColor={'gray'}
            value={form.price ?? ''}
            onChangeText={text => setForm(prev => ({...prev, price: text}))}
          />
          {/* <TextInput
            placeholder="Price"
            value={form.price}
            style={{
              width: width / 2.2,
            }}
            onChangeText={text => setForm(prev => ({...prev, price: text}))}
          /> */}
          {form.price != '0' && form.errorPrice != '' && (
            <HelperText type="error" visible={form.errorPrice != ''}>
              {form.errorPrice}
            </HelperText>
          )}
        </View>

        {form.category === 'Watch' || (
          <>
            <View style={tw`w-1/2  pt-2 pl-2`}>
              {/* <DropDown
                label={'Choose RAM'}
                mode={'outlined'}
                visible={form.isRamVisible}
                showDropDown={() =>
                  setForm(prev => ({...prev, isRamVisible: true}))
                }
                onDismiss={() =>
                  setForm(prev => ({...prev, isRamVisible: false}))
                }
                value={form.ram}
                setValue={text =>
                  setForm(prev => ({
                    ...prev,
                    ram: text,
                  }))
                }
                list={RamData}
                accessibilityLabel={'ram'}
                inputProps={{
                  right: <TextInput.Icon icon={'menu-down'} />,
                }}
              /> */}
              <SelectList
                boxStyles={styles.box}
                key={reset}
                // inputStyles={styles.box}
                placeholder="Choose Ram"
                inputStyles={{color: 'black'}}
                setSelected={text =>
                  setForm(prev => ({
                    ...prev,
                    ram: text,
                  }))
                }
                data={RamData}
                save="value"
                dropdownTextStyles={{color: 'black'}}
              />
            </View>
            <View style={tw`w-full  pt-2`}>
              {/* <DropDown
                label={'PTA Status'}
                mode={'outlined'}
                visible={form.isPTA_statusVisible}
                showDropDown={() =>
                  setForm(prev => ({...prev, isPTA_statusVisible: true}))
                }
                onDismiss={() =>
                  setForm(prev => ({...prev, isPTA_statusVisible: false}))
                }
                value={form.pta_status}
                setValue={text =>
                  setForm(prev => ({
                    ...prev,
                    pta_status: text,
                  }))
                }
                list={AccountStatusData}
                accessibilityLabel={'pta_status'}
                inputProps={{
                  right: <TextInput.Icon icon={'menu-down'} />,
                }}
              /> */}
              <SelectList
                boxStyles={styles.box}
                key={reset}
                placeholder="PTA Status"
                inputStyles={{color: 'black'}}
                setSelected={text =>
                  setForm(prev => ({
                    ...prev,
                    pta_status: text,
                  }))
                }
                data={AccountStatusData}
                save="value"
                dropdownTextStyles={{color: 'black'}}
              />
            </View>
            <View style={tw`w-full  pt-2`}>
              {/* <DropDown
                label={'Storage'}
                mode={'outlined'}
                visible={form.isStorageVisible}
                showDropDown={() =>
                  setForm(prev => ({...prev, isStorageVisible: true}))
                }
                onDismiss={() =>
                  setForm(prev => ({...prev, isStorageVisible: false}))
                }
                value={form.storage}
                setValue={text =>
                  setForm(prev => ({
                    ...prev,
                    storage: text,
                  }))
                }
                list={StorageData}
                accessibilityLabel={'storage'}
                inputProps={{
                  right: <TextInput.Icon icon={'menu-down'} />,
                }}
              /> */}
              <SelectList
                boxStyles={styles.box}
                key={reset}
                placeholder="Choose Storage"
                inputStyles={{color: 'black'}}
                setSelected={text =>
                  setForm(prev => ({
                    ...prev,
                    storage: text,
                  }))
                }
                data={StorageData}
                save="value"
                dropdownTextStyles={{color: 'black'}}
              />
            </View>
          </>
        )}
        <View style={tw`w-full  pt-2`}>
          {/* <DropDown
            label={'Product Condition'}
            mode={'outlined'}
            visible={form.isProduct_typeVisible}
            showDropDown={() =>
              setForm(prev => ({...prev, isProduct_typeVisible: true}))
            }
            onDismiss={() =>
              setForm(prev => ({...prev, isProduct_typeVisible: false}))
            }
            value={form.product_type}
            setValue={text =>
              setForm(prev => ({
                ...prev,
                product_type: text,
                isOtherProductUsed: text === 'Used' || text === 'Refurbished',
              }))
            }
            list={ConditionData}
            accessibilityLabel={'storage'}
            inputProps={{
              right: <TextInput.Icon icon={'menu-down'} />,
            }}
          /> */}
          <SelectList
            boxStyles={styles.box}
            key={reset}
            placeholder="Product Condition"
            inputStyles={{color: 'black'}}
            setSelected={text =>
              setForm(prev => ({
                ...prev,
                product_type: text,
                isOtherProductUsed: text === 'Used' || text === 'Refurbished',
              }))
            }
            data={ConditionData}
            save="value"
            dropdownTextStyles={{color: 'black'}}
          />
        </View>
      </View>
      {form.isOtherProductUsed && (
        <View style={tw`my-4 p-2 rounded-lg border border-gray-300`}>
          <Text style={{color: 'black'}}>Accessories</Text>
          <View>
            {Object.entries(toggleAccessories).map(([key, value]) => (
              <Checkbox.Item
                labelStyle={{color: 'black'}}
                color="blue"
                onPress={() => {
                  setToggleAccessories(prev => ({
                    ...prev,
                    ...{[key]: {...value, Selected: !value.Selected}},
                  }));
                }}
                label={value.label}
                status={value.Selected ? 'checked' : 'unchecked'}
              />
            ))}
          </View>
        </View>
      )}
      <View style={tw`w-full  pt-2`}>
        {/* <DropDown
          label={'Warranty'}
          mode={'outlined'}
          visible={form.isWarrantyVisible}
          showDropDown={() =>
            setForm(prev => ({...prev, isWarrantyVisible: true}))
          }
          onDismiss={() =>
            setForm(prev => ({...prev, isWarrantyVisible: false}))
          }
          value={form.warranty}
          setValue={text =>
            setForm(prev => ({
              ...prev,
              warranty: text,
            }))
          }
          list={WarrantyData}
          accessibilityLabel={'warranty'}
          inputProps={{
            right: <TextInput.Icon icon={'menu-down'} />,
          }}
        /> */}
        <SelectList
          boxStyles={styles.box}
          key={reset}
          placeholder="Warranty"
          inputStyles={{color: 'black'}}
          setSelected={text =>
            setForm(prev => ({
              ...prev,
              warranty: text,
            }))
          }
          data={WarrantyData}
          save="value"
          dropdownTextStyles={{color: 'black'}}
        />
        {form.errorWarranty != '' && <Text>{form.errorWarranty} </Text>}
      </View>
      {profileData?.city === null && (
        <View style={tw`w-full  pt-2 pr-2`}>
          {/* // <DropDown
        //   inputProps={{
        //     right: <TextInput.Icon icon={'menu-down'} />,
        //     style: {
        //       width: width / 2.2,
        //     },
        //   }}
        //   label={'City'}
        //   mode={'outlined'}
        //   visible={form.isCityVisible}
        //   showDropDown={() => setForm(prev => ({...prev, isCityVisible: true}))}
        //   onDismiss={() => setForm(prev => ({...prev, isCityVisible: false}))}
        //   value={form.city}
        //   setValue={text =>
        //     setForm(prev => ({
        //       ...prev,
        //       City: text,
        //     }))
        //   }
        //   list={CityData}
        //   accessibilityLabel={'city'} */}
          {/* // /> */}

          <SelectList
            boxStyles={styles.box}
            key={reset}
            placeholder="City"
            inputStyles={{color: 'black'}}
            setSelected={text =>
              setForm(prev => ({
                ...prev,
                city: text,
              }))
            }
            data={CityData}
            save="value"
            dropdownTextStyles={{color: 'black'}}
          />
        </View>
      )}

      {profileData.city === null && (
        <View style={tw`w-full  pt-2 pr-2`}>
          {/* <DropDown
            inputProps={{
              style: {
                width: width / 2.2,
              },
              right: <TextInput.Icon icon={'menu-down'} />,
            }}
            label={'Account Type'}
            mode={'outlined'}
            visible={form.isAccountTypeVisible}
            showDropDown={() =>
              setForm(prev => ({...prev, isAccountTypeVisible: true}))
            }
            onDismiss={() =>
              setForm(prev => ({...prev, isAccountTypeVisible: false}))
            }
            value={form.acc_type}
            setValue={text =>
              setForm(prev => ({
                ...prev,
                acc_type: text,
              }))
            }
            list={AccountTypeData}
            accessibilityLabel={'AccountType'}
          /> */}
          <SelectList
            placeholder="Account Type"
            inputStyles={{color: 'black'}}
            boxStyles={styles.box}
            key={reset}
            maxHeight={100}
            setSelected={text => {
              setForm(prev => ({
                ...prev,
                acc_type: text,
              }));
            }}
            data={AccountTypeData}
            save="value"
            dropdownTextStyles={{color: 'black'}}
            dropdownStyles={{borderCurve: 'continuous'}}
          />
        </View>
      )}
      {form.acc_type === 'business' && (
        <>
          <View style={tw`w-full  pt-2 pr-2`}>
            {/* <TextInput
              placeholder="Shop Name"
              mode="outlined"
              value={form.shop_name}
              // style={{
              //   width: width / 2.2,
              // }}
              onChangeText={text =>
                setForm(prev => ({...prev, shop_name: text}))
              }
            /> */}
            <TextInput
              style={styles.box_input}
              placeholder="Enter Your Shop Name"
              placeholderTextColor={'black'}
              value={form.shop_name ?? ''}
              onChangeText={text =>
                setForm(prev => ({...prev, shop_name: text}))
              }
            />
          </View>
          <View style={tw`w-full  pt-2 pr-2`}>
            {/* <TextInput
              label="Shop Address"
              mode="outlined"
              value={form.shop_address}
              // style={{
              //   width: width,
              // }}
              onChangeText={text =>
                setForm(prev => ({...prev, shop_address: text}))
              }
            /> */}
            <TextInput
              style={styles.box_input}
              placeholder="Enter Your Shop Address"
              placeholderTextColor={'black'}
              value={form.shop_address ?? ''}
              onChangeText={text =>
                setForm(prev => ({...prev, shop_address: text}))
              }
            />
          </View>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    marginTop: 10,
    width: '100%',
  },

  box_input: {
    height: 50,
    width: '100%',
    borderColor: 'grey',
    borderRadius: 10,
    color: color.black,
    borderWidth: 1,
    marginTop: 10,
    padding: 9,
  },
  check_box_box: {flexDirection: 'row', alignItems: 'center', marginTop: 5},
  check_box_text: {color: color.black, paddingLeft: 5},
  selectList: {
    color: 'black',
  },
  description: {
    height: 230,
    borderColor: color.black,
    borderRadius: 10,
    color: color.black,
    width: '100%',
    borderWidth: 1,
    alignContent: 'flex-start',
    textAlignVertical: 'top',
  },
});
