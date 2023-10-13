import {BRANDS, MODELS} from '@env';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import tw from 'twrnc';
import {selectAccessToken, selectProfileData} from '../Redux/Slices';
import {BrandAPI, ModelAPI, Profile} from '../types';
import {
  CategoryData,
  CityData,
  ConditionData,
  Form,
  RamData,
  StorageData,
  WarrantyData,
  styles,
  width,
} from './PostAndAdForm';

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
    // <View>
    //   <View style={tw`flex-row flex-wrap`}>
    //     <View style={tw`w-1/2 pt-2 pr-2`}>
    //       <View style={tw`w-1/2  pr-2`}>
    //         <SelectList
    //           boxStyles={styles.box}
    //           placeholder="Category"
    //           inputStyles={{color: 'grey'}}
    //           setSelected={val => {
    //             setForm({...form, category: val});
    //           }}
    //           data={CategoryData}
    //           save="value"
    //           dropdownTextStyles={{color: 'black'}}
    //         />
    //       </View>
    //       <DropDown
    //         label={'Choose Category'}
    //         mode={'outlined'}
    //         visible={form.isCategoryVisible}
    //         showDropDown={() =>
    //           setForm(prev => ({...prev, isCategoryVisible: true}))
    //         }
    //         onDismiss={() =>
    //           setForm(prev => ({...prev, isCategoryVisible: false}))
    //         }
    //         value={form.category}
    //         setValue={text => setForm(prev => ({...prev, category: text}))}
    //         list={CategoryData}
    //         inputProps={{
    //           right: <TextInput.Icon icon={'menu-down'} />,
    //         }}
    //       />
    //       {form.errorCategory != '' && (
    //         <HelperText type="error" visible={form.errorCategory != ''}>
    //           {form.errorCategory}
    //         </HelperText>
    //       )}
    //     </View>
    //     {loadingBrand ? (
    //       <ActivityIndicator style={tw`w-1/2 h-16`} size={30} />
    //     ) : (
    //       <View style={tw`w-1/2 pt-2 pl-2`}>
    //         <DropDown
    //           label={'Choose Brand'}
    //           mode={'outlined'}
    //           visible={form.isBrandVisible}
    //           showDropDown={() =>
    //             setForm(prev => ({...prev, isBrandVisible: true}))
    //           }
    //           onDismiss={() =>
    //             setForm(prev => ({...prev, isBrandVisible: false}))
    //           }
    //           value={form.isOtherBrand ? 'Other' : form.brand}
    //           setValue={text =>
    //             setForm(prev => ({
    //               ...prev,
    //               brand:
    //                 text === 'Other' || text === 'Other tablet' ? '' : text,
    //               isOtherModel: text === 'Other' || text === 'Other tablet',
    //               isOtherBrand: text === 'Other' || text === 'Other tablet',
    //             }))
    //           }
    //           list={brands}
    //           accessibilityLabel={'Brand'}
    //           inputProps={{
    //             right: <TextInput.Icon icon={'menu-down'} />,
    //           }}
    //         />
    //         {form.errorBrand != '' && (
    //           <HelperText type="error" visible={form.errorBrand != ''}>
    //             {form.errorBrand}
    //           </HelperText>
    //         )}
    //       </View>
    //     )}
    //     {form.isOtherBrand && (
    //       <View style={tw`w-full  pt-2`}>
    //         <TextInput
    //           mode="outlined"
    //           label="Enter your Brand"
    //           value={form.brand}
    //           onChangeText={text =>
    //             setForm(prev => ({...prev, brand: text}))
    //           }></TextInput>
    //         {form.errorBrand != '' && (
    //           <HelperText type="error" visible={form.errorBrand != ''}>
    //             {form.errorBrand}
    //           </HelperText>
    //         )}
    //       </View>
    //     )}
    //     {loadingModel ? (
    //       <ActivityIndicator style={tw`w-full h-16  pt-2`} size={30} />
    //     ) : (
    //       <>
    //         {form.isOtherModel ? (
    //           <View style={tw`w-full  pt-2`}>
    //             <TextInput
    //               mode="outlined"
    //               label="Enter your Model"
    //               value={form.model}
    //               //   style={{
    //               //     width: width / 2.2,
    //               //   }}
    //               onChangeText={text =>
    //                 setForm(prev => ({...prev, model: text}))
    //               }
    //             />
    //             {form.errorModel != '' && (
    //               <HelperText type="error" visible={form.errorModel != ''}>
    //                 {form.errorModel}
    //               </HelperText>
    //             )}
    //           </View>
    //         ) : (
    //           <View style={tw`w-full  pt-2`}>
    //             <DropDown
    //               label={'Model'}
    //               mode={'outlined'}
    //               visible={form.isOtherModel || form.isModelVisible}
    //               showDropDown={() =>
    //                 setForm(prev => ({...prev, isModelVisible: true}))
    //               }
    //               onDismiss={() =>
    //                 setForm(prev => ({...prev, isModelVisible: false}))
    //               }
    //               value={form.model}
    //               setValue={text =>
    //                 setForm(prev => ({
    //                   ...prev,
    //                   model: text === 'Other' ? '' : text,
    //                   isOtherModel: text === 'Other',
    //                 }))
    //               }
    //               list={models}
    //               accessibilityLabel={'Model'}
    //               inputProps={{
    //                 right: <TextInput.Icon icon={'menu-down'} />,
    //               }}
    //             />
    //             {form.errorModel != '' && (
    //               <HelperText type="error" visible={form.errorModel != ''}>
    //                 {form.errorModel}
    //               </HelperText>
    //             )}
    //           </View>
    //         )}
    //       </>
    //     )}
    //     <View style={tw`w-1/2  pt-2 pr-2`}>
    //       <TextInput
    //         label="Price"
    //         mode="outlined"
    //         value={form.price}
    //         style={{
    //           width: width / 2.2,
    //         }}
    //         onChangeText={text => setForm(prev => ({...prev, price: text}))}
    //       />
    //       {form.price != '0' && form.errorPrice != '' && (
    //         <HelperText type="error" visible={form.errorPrice != ''}>
    //           {form.errorPrice}
    //         </HelperText>
    //       )}
    //     </View>
    //     {form.category === 'Watch' || (
    //       <>
    //         <View style={tw`w-1/2  pt-2 pl-2`}>
    //           <DropDown
    //             label={'Choose RAM'}
    //             mode={'outlined'}
    //             visible={form.isRamVisible}
    //             showDropDown={() =>
    //               setForm(prev => ({...prev, isRamVisible: true}))
    //             }
    //             onDismiss={() =>
    //               setForm(prev => ({...prev, isRamVisible: false}))
    //             }
    //             value={form.ram}
    //             setValue={text =>
    //               setForm(prev => ({
    //                 ...prev,
    //                 ram: text,
    //               }))
    //             }
    //             list={RamData}
    //             accessibilityLabel={'ram'}
    //             inputProps={{
    //               right: <TextInput.Icon icon={'menu-down'} />,
    //             }}
    //           />
    //         </View>
    //         <View style={tw`w-full  pt-2`}>
    //           <DropDown
    //             label={'PTA Status'}
    //             mode={'outlined'}
    //             visible={form.isPTA_statusVisible}
    //             showDropDown={() =>
    //               setForm(prev => ({...prev, isPTA_statusVisible: true}))
    //             }
    //             onDismiss={() =>
    //               setForm(prev => ({...prev, isPTA_statusVisible: false}))
    //             }
    //             value={form.pta_status}
    //             setValue={text =>
    //               setForm(prev => ({
    //                 ...prev,
    //                 pta_status: text,
    //               }))
    //             }
    //             list={AccountStatusData}
    //             accessibilityLabel={'pta_status'}
    //             inputProps={{
    //               right: <TextInput.Icon icon={'menu-down'} />,
    //             }}
    //           />
    //         </View>
    //         <View style={tw`w-full  pt-2`}>
    //           <DropDown
    //             label={'Storage'}
    //             mode={'outlined'}
    //             visible={form.isStorageVisible}
    //             showDropDown={() =>
    //               setForm(prev => ({...prev, isStorageVisible: true}))
    //             }
    //             onDismiss={() =>
    //               setForm(prev => ({...prev, isStorageVisible: false}))
    //             }
    //             value={form.storage}
    //             setValue={text =>
    //               setForm(prev => ({
    //                 ...prev,
    //                 storage: text,
    //               }))
    //             }
    //             list={StorageData}
    //             accessibilityLabel={'storage'}
    //             inputProps={{
    //               right: <TextInput.Icon icon={'menu-down'} />,
    //             }}
    //           />
    //         </View>
    //       </>
    //     )}
    //     <View style={tw`w-full  pt-2`}>
    //       <DropDown
    //         label={'Product Condition'}
    //         mode={'outlined'}
    //         visible={form.isProduct_typeVisible}
    //         showDropDown={() =>
    //           setForm(prev => ({...prev, isProduct_typeVisible: true}))
    //         }
    //         onDismiss={() =>
    //           setForm(prev => ({...prev, isProduct_typeVisible: false}))
    //         }
    //         value={form.product_type}
    //         setValue={text =>
    //           setForm(prev => ({
    //             ...prev,
    //             product_type: text,
    //             isOtherProductUsed: text === 'Used' || text === 'Refurbished',
    //           }))
    //         }
    //         list={ConditionData}
    //         accessibilityLabel={'storage'}
    //         inputProps={{
    //           right: <TextInput.Icon icon={'menu-down'} />,
    //         }}
    //       />
    //     </View>
    //   </View>
    //   {form.isOtherProductUsed && (
    //     <View style={tw`my-4 p-2 rounded-lg border border-gray-300`}>
    //       <Text>Accessories</Text>
    //       <View>
    //         <Checkbox.Item
    //           onPress={() => {
    //             setToggleAccessories(prev => ({
    //               ...prev,
    //               box: !prev.box,
    //             }));
    //           }}
    //           label="Box"
    //           status={toggleAccessories.box ? 'checked' : 'unchecked'}
    //         />
    //         <Checkbox.Item
    //           onPress={() => {
    //             setToggleAccessories(prev => ({
    //               ...prev,
    //               charger: !prev.charger,
    //             }));
    //           }}
    //           label="Charger"
    //           status={toggleAccessories.charger ? 'checked' : 'unchecked'}
    //         />
    //         <Checkbox.Item
    //           onPress={() => {
    //             setToggleAccessories(prev => ({
    //               ...prev,
    //               data_cable: !prev.data_cable,
    //             }));
    //           }}
    //           label="Data Cable"
    //           status={toggleAccessories.data_cable ? 'checked' : 'unchecked'}
    //         />
    //         <Checkbox.Item
    //           onPress={() => {
    //             setToggleAccessories(prev => ({
    //               ...prev,
    //               handfree: !prev.handfree,
    //             }));
    //           }}
    //           label="Hand Free"
    //           status={toggleAccessories.handfree ? 'checked' : 'unchecked'}
    //         />
    //         <Checkbox.Item
    //           onPress={() => {
    //             setToggleAccessories(prev => ({
    //               ...prev,
    //               kit_only: !prev.kit_only,
    //             }));
    //           }}
    //           label="Kit-only"
    //           status={toggleAccessories.kit_only ? 'checked' : 'unchecked'}
    //         />
    //       </View>
    //     </View>
    //   )}
    //   <View style={tw`w-full  pt-2`}>
    //     <DropDown
    //       label={'Warranty'}
    //       mode={'outlined'}
    //       visible={form.isWarrantyVisible}
    //       showDropDown={() =>
    //         setForm(prev => ({...prev, isWarrantyVisible: true}))
    //       }
    //       onDismiss={() =>
    //         setForm(prev => ({...prev, isWarrantyVisible: false}))
    //       }
    //       value={form.warranty}
    //       setValue={text =>
    //         setForm(prev => ({
    //           ...prev,
    //           warranty: text,
    //         }))
    //       }
    //       list={WarrantyData}
    //       accessibilityLabel={'warranty'}
    //       inputProps={{
    //         right: <TextInput.Icon icon={'menu-down'} />,
    //       }}
    //     />
    //     {form.errorWarranty != '' && <Text>{form.errorWarranty} </Text>}
    //   </View>
    //   {profileData.city === null && (
    //     <DropDown
    //       inputProps={{
    //         right: <TextInput.Icon icon={'menu-down'} />,
    //         style: {
    //           width: width / 2.2,
    //         },
    //       }}
    //       label={'City'}
    //       mode={'outlined'}
    //       visible={form.isCityVisible}
    //       showDropDown={() => setForm(prev => ({...prev, isCityVisible: true}))}
    //       onDismiss={() => setForm(prev => ({...prev, isCityVisible: false}))}
    //       value={form.city}
    //       setValue={text =>
    //         setForm(prev => ({
    //           ...prev,
    //           City: text,
    //         }))
    //       }
    //       list={CityData}
    //       accessibilityLabel={'city'}
    //     />
    //   )}
    //   {profileData.account_status === null && (
    //     <View style={tw`w-full  pt-2 pr-2`}>
    //       <DropDown
    //         inputProps={{
    //           style: {
    //             width: width / 2.2,
    //           },
    //           right: <TextInput.Icon icon={'menu-down'} />,
    //         }}
    //         label={'Account Type'}
    //         mode={'outlined'}
    //         visible={form.isAccountTypeVisible}
    //         showDropDown={() =>
    //           setForm(prev => ({...prev, isAccountTypeVisible: true}))
    //         }
    //         onDismiss={() =>
    //           setForm(prev => ({...prev, isAccountTypeVisible: false}))
    //         }
    //         value={form.acc_type}
    //         setValue={text =>
    //           setForm(prev => ({
    //             ...prev,
    //             acc_type: text,
    //           }))
    //         }
    //         list={AccountTypeData}
    //         accessibilityLabel={'AccountType'}
    //       />
    //     </View>
    //   )}
    //   {profileData?.user_type === 'business' && (
    //     <>
    //       <View style={tw`w-full  pt-2 pr-2`}>
    //         <TextInput
    //           label="Shop Name"
    //           mode="outlined"
    //           value={form.shop_name}
    //           // style={{
    //           //   width: width / 2.2,
    //           // }}
    //           onChangeText={text =>
    //             setForm(prev => ({...prev, shop_name: text}))
    //           }
    //         />
    //       </View>
    //       <View style={tw`w-full  pt-2 pr-2`}>
    //         <TextInput
    //           label="Shop Address"
    //           mode="outlined"
    //           value={form.shop_address}
    //           // style={{
    //           //   width: width,
    //           // }}
    //           onChangeText={text =>
    //             setForm(prev => ({...prev, shop_address: text}))
    //           }
    //         />
    //       </View>
    //     </>
    //   )}
    // </View>
    <SafeAreaView style={tw`h-full bg-[#015dcf]`}>
      <Header title="Post an Ad" />
      <View style={tw`bg-[#edf2f2] flex-1`}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 200,
            // backgroundColor: '#015DCF',
          }}
          keyboardShouldPersistTaps="handled">
          <View style={tw` w-full items-start justify-center px-4`}>
            <View style={tw`w-full`}>
              <View style={tw`flex-row pt-2 items-center justify-between`}>
                <View style={tw`w-1/2  pr-2`}>
                  <SelectList
                    boxStyles={styles.box}
                    placeholder="Category"
                    inputStyles={{color: 'grey'}}
                    setSelected={val => {
                      setForm({...form, category: val});
                    }}
                    data={CategoryData}
                    save="value"
                    dropdownTextStyles={{color: 'black'}}
                  />
                </View>
                <View style={tw`w-1/2 pl-2`}>
                  <SelectList
                    boxStyles={styles.box}
                    placeholder="Choose Brand"
                    inputStyles={{
                      color: 'grey',
                      // fontFamily: 'Geologica_Auto-Black',
                    }}
                    setSelected={val => {
                      setForm({...form, brand: val});
                      setisTablet(false);
                      setFieldErrors({...fieldErrors, brand: ''});
                    }}
                    data={brands}
                    save="value"
                    dropdownTextStyles={{color: 'black'}}
                  />
                  {fieldErrors.brand != '' && (
                    <Text style={{color: 'red'}}>{fieldErrors?.brand}</Text>
                  )}
                </View>
              </View>
              {/* {isOtherBrand && (
              

            )} */}
              {form.category === 'Mobile' && form.brand?.includes('Other') ? (
                <>
                  <TextInput
                    placeholder="Enter brand"
                    placeholderTextColor={'gray'}
                    style={styles.box_input}
                    value={brand}
                    onChangeText={text => setBrand(text)}
                  />
                  <TextInput
                    placeholder="Enter Model"
                    placeholderTextColor={'gray'}
                    style={styles.box_input}
                    onChangeText={text => {
                      {
                        setForm({...form, model: text});
                      }
                    }}
                  />
                </>
              ) : (
                <></>
              )}

              {form.category === 'Tablet' || form.category === 'Watch' ? (
                <>
                  <TextInput
                    placeholder="Choose model "
                    placeholderTextColor={'gray'}
                    style={styles.box_input}
                    onChangeText={text => {
                      {
                        setForm({...form, model: text});
                      }
                    }}
                  />
                </>
              ) : (
                <></>
              )}

              {form.category === 'Mobile' && !form.brand?.includes('Other') ? (
                <>
                  <SelectList
                    boxStyles={styles.box}
                    placeholder="Choose model"
                    inputStyles={{color: 'black'}}
                    setSelected={val => {
                      setIsOtherModel(false);
                      setForm({...form, model: val});
                    }}
                    data={models}
                    save="value"
                    dropdownTextStyles={{color: 'black'}}
                  />
                </>
              ) : (
                <></>
              )}
              {form.category === 'Mobile' &&
              !form.brand?.includes('Other') &&
              form.model === 'Other' ? (
                <TextInput
                  placeholder="Enter Model"
                  placeholderTextColor={'grey'}
                  style={styles.box_input}
                  value={form.otherModel}
                  onChangeText={text => {
                    {
                      setForm({...form, otherModel: text});
                    }
                  }}
                />
              ) : null}
              {/* {otherModels &&
              form.category === 'Mobile' &&
              form.model == 'Other' && (
              
              )} */}

              <TextInput
                style={styles.box_input}
                keyboardType="number-pad"
                placeholder="Enter Price"
                placeholderTextColor={'gray'}
                value={form.price ?? ''}
                onChangeText={text => {
                  setForm({...form, price: text});
                  setFieldErrors({...fieldErrors, price: ''});
                }}
              />

              <Text style={styles.error}>{fieldErrors.price}</Text>
              {form.category === 'Watch' || (
                <SelectList
                  boxStyles={styles.box}
                  // inputStyles={styles.box}
                  placeholder="Choose Ram"
                  inputStyles={{color: 'black'}}
                  setSelected={val =>
                    setForm({...form, ram: val.replace(' GB', '')})
                  }
                  data={RamData}
                  save="value"
                  dropdownTextStyles={{color: 'black'}}
                />
              )}
              {form.category === 'Watch' || (
                <SelectList
                  boxStyles={styles.box}
                  placeholder="PTA Status"
                  inputStyles={{color: 'black'}}
                  setSelected={val => setForm({...form, pta_status: val})}
                  data={approved}
                  save="value"
                  dropdownTextStyles={{color: 'black'}}
                />
              )}
              {form.category === 'Watch' || (
                <SelectList
                  boxStyles={styles.box}
                  placeholder="Choose Storage"
                  inputStyles={{color: 'black'}}
                  setSelected={val =>
                    setForm({...form, storage: val.replace(' GB', '')})
                  }
                  data={StorageData}
                  save="value"
                  dropdownTextStyles={{color: 'black'}}
                />
              )}
              <SelectList
                boxStyles={styles.box}
                placeholder="Product Condition"
                inputStyles={{color: 'black'}}
                setSelected={val => setForm({...form, product_type: val})}
                data={ConditionData}
                save="value"
                dropdownTextStyles={{color: 'black'}}
              />

              {condition ? (
                <View style={{padding: 5, paddingVertical: 15}}>
                  <Text
                    style={{
                      color: color.black,
                      fontWeight: '500',
                      fontSize: 15,
                    }}>
                    Accessories
                  </Text>

                  <View style={styles.check_box_box}>
                    <CheckBox
                      disabled={false}
                      value={toggleAccessories.box}
                      tintColors={{true: color.black, false: color.black}}
                      onValueChange={newValue =>
                        setToggleAccessories({
                          ...toggleAccessories,
                          box: newValue,
                        })
                      }
                    />
                    <Text style={styles.check_box_text}>Box</Text>
                  </View>

                  <View style={styles.check_box_box}>
                    <CheckBox
                      disabled={false}
                      tintColors={{true: color.black, false: color.black}}
                      value={toggleAccessories.charger}
                      onValueChange={newValue =>
                        setToggleAccessories({
                          ...toggleAccessories,
                          charger: newValue,
                        })
                      }
                    />
                    <Text style={styles.check_box_text}>Charger</Text>
                  </View>

                  <View style={styles.check_box_box}>
                    <CheckBox
                      disabled={false}
                      tintColors={{true: color.black, false: color.black}}
                      // tintColors={color.black}
                      value={toggleAccessories.data_cable}
                      onValueChange={newValue =>
                        setToggleAccessories({
                          ...toggleAccessories,
                          data_cable: newValue,
                        })
                      }
                    />
                    <Text style={styles.check_box_text}>Data Cable</Text>
                  </View>

                  <View style={styles.check_box_box}>
                    <CheckBox
                      disabled={false}
                      tintColors={{true: color.black, false: color.black}}
                      value={toggleAccessories.handfree}
                      onValueChange={newValue =>
                        setToggleAccessories({
                          ...toggleAccessories,
                          handfree: newValue,
                        })
                      }
                    />
                    <Text style={styles.check_box_text}>Hand Free</Text>
                  </View>

                  <View style={styles.check_box_box}>
                    <CheckBox
                      disabled={false}
                      tintColors={{true: color.black, false: color.black}}
                      value={toggleAccessories.kit_only}
                      onValueChange={newValue =>
                        setToggleAccessories({
                          ...toggleAccessories,
                          kit_only: newValue,
                        })
                      }
                    />
                    <Text style={styles.check_box_text}>Kit-only</Text>
                  </View>
                </View>
              ) : null}
              <SelectList
                boxStyles={styles.box}
                placeholder="Warranty"
                inputStyles={{color: 'black'}}
                setSelected={val => setForm({...form, warranty: val})}
                data={WarrantyData}
                save="value"
                dropdownTextStyles={{color: 'black'}}
              />
              {profileData.city === null && (
                <>
                  <SelectList
                    boxStyles={styles.box}
                    placeholder="City"
                    inputStyles={{color: 'black'}}
                    setSelected={val => setForm({...form, city: val})}
                    data={CityData}
                    save="value"
                    dropdownTextStyles={{color: 'black'}}
                  />
                </>
              )}
              {profileData.account_status === null && (
                <SelectList
                  placeholder="Account Type"
                  inputStyles={{color: 'black'}}
                  boxStyles={styles.box}
                  maxHeight={100}
                  setSelected={val => {
                    setForm({...form, acc_type: val});
                  }}
                  data={data}
                  save="value"
                  dropdownTextStyles={{color: 'black'}}
                  dropdownStyles={{borderCurve: 'continuous'}}
                />
              )}

              {IsVerifiedStorage || (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: 10,
                      justifyContent: 'space-between',
                    }}>
                    {isOtp ? (
                      <>
                        <TextInput
                          style={{
                            paddingHorizontal: 8,
                            borderWidth: 1,
                            flex: 1,
                            borderRadius: 5,
                            color: 'black',
                            marginRight: 5,
                          }}
                          keyboardType="number-pad"
                          placeholder="Enter OTP"
                          placeholderTextColor={'lightgrey'}
                          value={otp}
                          onChangeText={text =>
                            setOtp(text?.replace(/[^0-9]/g, ''))
                          }
                        />
                        <Button
                          theme={{
                            colors: {primary: color.orange},
                            roundness: 90,
                          }}
                          mode={'contained'}
                          onPress={OTPVerify}
                          compact
                          textColor="white">
                          VERIFY OTP
                        </Button>

                        <Button
                          theme={{
                            colors: {primary: color.orange},
                            roundness: 90,
                          }}
                          mode={'contained'}
                          compact
                          textColor="white"
                          onPress={SendOTP}
                          disabled={disabled}>
                          Resend OTP
                        </Button>
                      </>
                    ) : (
                      profileData.account_status === null && (
                        <>
                          <TextInput
                            style={{
                              paddingHorizontal: 8,
                              borderWidth: 1,
                              flex: 1,
                              borderRadius: 5,
                              color: 'black',
                              marginRight: 5,
                            }}
                            keyboardType="number-pad"
                            placeholder="Enter your number"
                            placeholderTextColor={'lightgrey'}
                            inputMode="numeric"
                            value={phoneNumber}
                            onChangeText={text => {
                              setPhoneNumber(text?.replace(/[^0-9]/g, ''));
                            }}
                          />
                          <Button
                            theme={{
                              colors: {primary: color.orange},
                              roundness: 90,
                            }}
                            mode={'contained'}
                            onPress={SendOTP}
                            textColor="white">
                            SEND OTP
                          </Button>
                        </>
                      )
                    )}
                  </View>
                </>
              )}
            </View>
            <Text style={{color: 'black', fontWeight: '700', paddingTop: 20}}>
              Product Image
            </Text>
            <FlatList
              horizontal
              data={form?.image}
              contentContainerStyle={{paddingVertical: 10, zIndex: 999}}
              renderItem={({item}) => (
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    marginRight: 15,
                    zIndex: 999,
                    marginVertical: 5,
                  }}
                  source={{uri: item.uri}}
                />
              )}
            />

            <Text
              style={{marginVertical: 5, color: 'black', fontWeight: '700'}}>
              Upload upto 20 images
            </Text>
            <TouchableOpacity
              onPress={ImageUpload}
              style={{
                backgroundColor: color.orange,
                width: width - 50,
                height: 50,
                borderRadius: 20,
                marginTop: 40,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 12,
              }}>
              <Text
                style={{
                  color: color.white,
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                {uploadButton}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontWeight: '600',
                color: 'black',
                fontSize: 15,
                marginVertical: 16,
              }}>
              Description
            </Text>

            <TextInput
              style={styles.description}
              multiline={true}
              value={form.description ?? ''}
              onChangeText={text => setForm({...form, description: text})}
              numberOfLines={5}
            />

            <TouchableOpacity
              onPress={() => {
                !IsVerifiedStorage
                  ? Alert.alert('Please Verify OTP')
                  : validateAndSubmitForm();
              }}
              disabled={isOtp ? true : false}
              style={{
                backgroundColor: color.orange,
                width: width - 50,
                height: 50,
                borderRadius: 20,
                marginTop: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: color.white,
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                {button}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
