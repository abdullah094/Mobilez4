import {BRANDS, MODELS} from '@env';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {
  ActivityIndicator,
  Checkbox,
  HelperText,
  Text,
  TextInput,
} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import {useSelector} from 'react-redux';
import tw from 'twrnc';
import {selectAccessToken, selectProfileData} from '../Redux/Slices';
import {BrandAPI, ModelAPI, Profile} from '../types';
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
  {label: 'Verified', value: 'Verified'},
  {label: 'NON-Verified', value: 'NON-Verified'},
];
const CityData = [
  {label: 'Karachi', value: 'Karachi'},
  {label: 'Faislabad', value: 'Faislabad'},
];
const AccountTypeData = [
  {label: 'individual', value: 'individual'},
  {label: 'business', value: 'business'},
];

export interface Form {
  category: 'Mobile' | 'Tablet' | 'Watch';
  isCategoryVisible: boolean;
  errorCategory: string;
  brand: string;
  isBrandVisible: boolean;
  errorBrand: string;
  isOtherBrand: boolean;
  model: string | null;
  isOtherModel: boolean;
  errorModel: '';
  isModelVisible: boolean;
  otherModel: false;
  price?: string;
  errorPrice: string;
  ram: string;
  errorRam: string;
  isRamVisible: boolean;
  pta_status: 'Approved' | 'Not Approved' | 's';
  isPTA_statusVisible: boolean;
  errorPTA_status: string;
  storage: string;
  errorStorage: string;
  isStorageVisible: boolean;
  warranty: string;
  isWarrantyVisible: boolean;
  errorWarranty: string;
  city?: string;
  isCityVisible: boolean;
  product_type?: 'New' | 'Used' | 'Refurbished';

  errorProduct_type: string;
  isProduct_typeVisible: boolean;
  isOtherProductUsed: boolean;
  image?: Asset[];
  description?: string | null;
  accessories?: [string];
  acc_type?: string | null;
  isAccountTypeVisible: boolean;
  shop_name?: string;
  shop_address?: string;
}

export default function PostAndAdForm({
  form,
  setForm,
}: {
  form: Form;
  setForm: any;
}) {
  const _accessToken = useSelector(selectAccessToken);
  const profileData = useSelector(selectProfileData) as Profile;
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [loadingBrand, setLoadingBrand] = useState(false);
  const [loadingModel, setLoadingModel] = useState(false);

  const [toggleAccessories, setToggleAccessories] = useState({
    box: false,
    charger: false,
    data_cable: false,
    handfree: false,
    kit_only: false,
  });
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

  useEffect(() => {
    getModelFunc();
  }, [form.brand]);
  console.log(form);
  console.log('profileeeeeeeeee', profileData);
  return (
    <View>
      <View style={tw`flex-row flex-wrap`}>
        <View style={tw`w-1/2 pt-2 pr-2`}>
          <DropDown
            label={'Category'}
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
          />
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
            <DropDown
              label={'Brand'}
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
            />
            {form.errorBrand != '' && (
              <HelperText type="error" visible={form.errorBrand != ''}>
                {form.errorBrand}
              </HelperText>
            )}
          </View>
        )}
        {form.isOtherBrand && (
          <View style={tw`w-full  pt-2`}>
            <TextInput
              mode="outlined"
              label="Brand"
              value={form.brand}
              onChangeText={text =>
                setForm(prev => ({...prev, brand: text}))
              }></TextInput>
            {form.errorBrand != '' && (
              <HelperText type="error" visible={form.errorBrand != ''}>
                {form.errorBrand}
              </HelperText>
            )}
          </View>
        )}
        {loadingModel ? (
          <ActivityIndicator style={tw`w-full h-16  pt-2`} size={30} />
        ) : (
          <>
            {form.isOtherModel ? (
              <View style={tw`w-full  pt-2`}>
                <TextInput
                  mode="outlined"
                  label="Model"
                  value={form.model}
                  //   style={{
                  //     width: width / 2.2,
                  //   }}
                  onChangeText={text =>
                    setForm(prev => ({...prev, model: text}))
                  }
                />
                {form.errorModel != '' && (
                  <HelperText type="error" visible={form.errorModel != ''}>
                    {form.errorModel}
                  </HelperText>
                )}
              </View>
            ) : (
              <View style={tw`w-full  pt-2`}>
                <DropDown
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
                />
                {form.errorModel != '' && (
                  <HelperText type="error" visible={form.errorModel != ''}>
                    {form.errorModel}
                  </HelperText>
                )}
              </View>
            )}
          </>
        )}

        <View style={tw`w-1/2  pt-2 pr-2`}>
          <TextInput
            label="Price"
            mode="outlined"
            value={form.price}
            style={{
              width: width / 2.2,
            }}
            onChangeText={text => setForm(prev => ({...prev, price: text}))}
          />
          {form.price != '0' && form.errorPrice != '' && (
            <HelperText type="error" visible={form.errorPrice != ''}>
              {form.errorPrice}
            </HelperText>
          )}
        </View>

        {form.category === 'Watch' || (
          <>
            <View style={tw`w-1/2  pt-2 pl-2`}>
              <DropDown
                label={'RAM'}
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
              />
            </View>
            <View style={tw`w-full  pt-2`}>
              <DropDown
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
              />
            </View>
            <View style={tw`w-full  pt-2`}>
              <DropDown
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
              />
            </View>
          </>
        )}
        <View style={tw`w-full  pt-2`}>
          <DropDown
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
          />
        </View>
      </View>
      {form.isOtherProductUsed && (
        <View style={tw`my-4 p-2 rounded-lg border border-gray-300`}>
          <Text>Accessories</Text>
          <View>
            <Checkbox.Item
              onPress={() => {
                setToggleAccessories(prev => ({
                  ...prev,
                  box: !prev.box,
                }));
              }}
              label="Box"
              status={toggleAccessories.box ? 'checked' : 'unchecked'}
            />
            <Checkbox.Item
              onPress={() => {
                setToggleAccessories(prev => ({
                  ...prev,
                  charger: !prev.charger,
                }));
              }}
              label="Charger"
              status={toggleAccessories.charger ? 'checked' : 'unchecked'}
            />
            <Checkbox.Item
              onPress={() => {
                setToggleAccessories(prev => ({
                  ...prev,
                  data_cable: !prev.data_cable,
                }));
              }}
              label="Data Cable"
              status={toggleAccessories.data_cable ? 'checked' : 'unchecked'}
            />
            <Checkbox.Item
              onPress={() => {
                setToggleAccessories(prev => ({
                  ...prev,
                  handfree: !prev.handfree,
                }));
              }}
              label="Hand Free"
              status={toggleAccessories.handfree ? 'checked' : 'unchecked'}
            />
            <Checkbox.Item
              onPress={() => {
                setToggleAccessories(prev => ({
                  ...prev,
                  kit_only: !prev.kit_only,
                }));
              }}
              label="Kit-only"
              status={toggleAccessories.kit_only ? 'checked' : 'unchecked'}
            />
          </View>
        </View>
      )}
      <View style={tw`w-full  pt-2`}>
        <DropDown
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
        />
        {form.errorWarranty != '' && <Text>{form.errorWarranty} </Text>}
      </View>
      {form.city === null && (
        <DropDown
          inputProps={{
            style: {
              width: width / 2.2,
            },
          }}
          label={'City'}
          mode={'outlined'}
          visible={form.isCityVisible}
          showDropDown={() => setForm(prev => ({...prev, isCityVisible: true}))}
          onDismiss={() => setForm(prev => ({...prev, isCityVisible: false}))}
          value={form.city}
          setValue={text =>
            setForm(prev => ({
              ...prev,
              City: text,
            }))
          }
          list={CityData}
          accessibilityLabel={'city'}
        />
      )}
      {profileData.account_status === null && (
        <View style={tw`w-full  pt-2 pr-2`}>
          <DropDown
            inputProps={{
              style: {
                width: width / 2.2,
              },
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
          />
        </View>
      )}
      {form.acc_type === 'business' && (
        <>
          <View style={tw`w-full  pt-2 pr-2`}>
            <TextInput
              label="Shop Name"
              mode="outlined"
              value={form.shop_name}
              // style={{
              //   width: width / 2.2,
              // }}
              onChangeText={text =>
                setForm(prev => ({...prev, shop_name: text}))
              }
            />
          </View>
          <View style={tw`w-full  pt-2 pr-2`}>
            <TextInput
              label="Shop Address"
              mode="outlined"
              value={form.shop_address}
              // style={{
              //   width: width,
              // }}
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
