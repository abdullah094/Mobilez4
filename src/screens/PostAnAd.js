import { StyleSheet, Text, View ,ScrollView, TextInput,Dimensions, TouchableOpacity,Pressable, Button, FlatList, Image} from 'react-native'
import React,{useEffect, useState} from 'react'
import { color } from '../constants/Colors'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { SelectList } from 'react-native-dropdown-select-list'
import {POSTANAD,BRANDS,MODELS} from '@env'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import DocumentPicker from 'react-native-document-picker'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';




const {width,height} = Dimensions.get('window')
const PostAnAd = ({navigation}) => {

  const [brands,setBrands] = useState([])
  const [otherBrand,setOtherBrand] = useState(false)
const [condition, setCondition] = useState(false)
  const [models,setModels] = useState([])
  const [approved,setApproved] = useState([
    {key:1,value:"Approved"},
    {key:2,value:"Non Approved"}
  ])
const [toggleAccesories, setToggleAccesories] = useState({
  box: false,
  charger: false,
  data_cable: false,
  handfree:false,
  kit_only:false
})
const [images, setImages] = useState([])
  const [brand,setBrand] = useState()
  const [model,setModel] = useState()
  const [form, setForm] = useState({
    seller_id:"",
    brand:"",
    model:"",
    price:"",
    storage:"",
    ram:"",
        product_type:"",
        pta_status:"",
        image:"",
        description:"",
        warranty:"",
        category:"",
        feature_add:"",
        accessories:""
      })
      const Ram = [
        {key:1,value:'1 GB'},
        {key:2,value:'2 GB'},
        {key:3,value:'4 GB'},
        {key:4,value:'6 GB'},
        {key:5,value:'8 GB'},
        {key:6,value:'12 GB'},
        {key:7,value:'16 GB'},
      ]
      const Storage = [
        {key:1,value:'4 GB'},
        {key:2,value:'8 GB'},
        {key:3,value:'16 GB'},
        {key:4,value:'32 GB'},
        {key:5,value:'64 GB'},
        {key:6,value:'32 GB'},
        {key:7,value:'64 GB'},
        {key:8,value:'128 GB'},
        {key:9,value:'256 GB'},
        {key:10,value:'512 GB'},
        {key:11,value:'1 TB'},
      ]
      const Warranty = [
        {key:1,value:'No Warrenty'},
        {key:2,value:'1 month'},
        {key:3,value:'2 months'},
        {key:4,value:'3 months'},
        {key:5,value:'4 months'},
        {key:6,value:'5 months'},
        {key:7,value:'6 months'},
        {key:8,value:'7 months'},
        {key:9,value:'8 months'},
        {key:10,value:'9 months'},
        {key:11,value:'10 months'},
        {key:12,value:'11 months'},
        {key:13,value:'12 months'},

      ]
      const Condition = [
        {key:1,value:'New'},
        {key:2,value:'Used'},
        {key:3,value:'Refurbished'},
      ]
      const Category = [
        {key:1,value:"Mobile"},
        {key:1,value:"Tablet"},
        {key:1,value:"Watch"},
      ]
      
      if(form.brand==="Other"){
        setTimeout(() => {
          setOtherBrand(true)
        }, 300);
      }
      else{
        setTimeout(() => {
          setOtherBrand(false)
        }, 300);
      }

      // condition logic
      if(form.category==="Used"||form.category==="Refurbished"){
setTimeout(() => {
  setCondition(true)
}, 300);
      }
      else{
        setTimeout(() => {
          setCondition(false)
        }, 300);
      }
    const _accessToken = useSelector((state)=>state.todo.accessToken)

const getBrandFunc = () => {              //Get brands with this function
  axios.get(BRANDS,{
    headers: { Authorization: `Bearer ${_accessToken}` }
  })
  .then((response)=>{
    let brand_array = []
    response.data.brands.forEach(element => {
    brand_array.push({
      key: element.id,
      value: element.title
    })
    });
    setBrands(brand_array)
  })
  .catch((error)=>{
    console.log("Brands "+error)
  })
}
const getModelFunc = () => {          //Get models with this function

  const api = MODELS+form.brand
  axios.get(api,{
    headers: { Authorization: `Bearer ${_accessToken}` }
  })
  .then((response)=>{
 
    let brand_array = []
    response.data.models.forEach(element => {
    brand_array.push({
      key: element.id,
      value: element.model_name
    })
    });
    setModels(brand_array)
  })
  .catch((error)=>{
    console.log("Brands "+error)
  })
}
const options = {
  mediaType: 'photo',
  maxWidth: 70,
  maxHeight: 70,
  quality: 1,
  selectionLimit:20,
 
}
const ImageUpload = async() => {          //Image upload Function
  let images = []
 const result = await launchImageLibrary(options);

 result.assets.forEach((element)=>{
  images.push(element.uri)
 })
 setImages(images)
}
console.log(images)

useEffect(()=>{
  getBrandFunc()
},[])
useEffect(()=>{
  getModelFunc()
},[form.brand])
    const PostAdFunc = () => {

    }
  return (
    <> 
       {/* <View style={{width:width,height:200,position:'absolute',top:0}}>
    <Pressable 
      style={{position:'absolute',left:20,zIndex:999,
      shadowColor: '#FFFFFF',

      }} onPress={()=>navigation.goBack()}>
      <MaterialIcon name='keyboard-arrow-left' size={40} color={color.black}/>
      </Pressable>
    </View> */}
    <ScrollView contentContainerStyle={{alignItems:'center',paddingBottom:200}}>
      <Text style={{color:color.black,fontSize:25,marginTop:40,marginBottom:40,fontWeight:'bold'}}>Post an ad</Text>
      <View style={styles.box}>
        <Text style={styles.box_heading}>Choose Category</Text>
        <View style={{marginTop:10}}>
        <SelectList
        search={false}     
        placeholder='Choose Device Type'
        setSelected={(val) => setForm({...form,category:val})} 
        data={Category} 
        save="value"
    />
        </View>   
      </View>
      <View style={styles.box}>
        <Text style={styles.box_heading}>Product Brand</Text>
        {/* searchable drop down */}
      <View style={{marginTop:10}}>
        <SelectList     
        placeholder='Choose Brands'
        setSelected={(val) => setForm({...form,brand:val})} 
        data={brands} 
        save="value"
    />
        </View>   
        {
         otherBrand&&
          <TextInput placeholder='Choose brand'  style={styles.box_input} value={brand} onChangeText={(text)=>setBrand(text)}/>
        }
      </View>

      <View style={styles.box}>
        <Text style={styles.box_heading}>Product Model</Text>
         {/* searchable drop down */}

         {otherBrand?
           <TextInput placeholder='Choose Model' style={styles.box_input} value={form.model} onChangeText={(text)=>setForm({...form,model:text})}/>
          :
          <View style={{marginTop:10 }}>
          <SelectList 
          placeholder='Choose model'
          setSelected={(val) => setForm({...form,model:val})} 
          data={models} 
          save="value"
      /> 
          </View>
          
          }
       
      </View>

      <View style={styles.box}>
        <Text style={styles.box_heading}>Price</Text>
        <TextInput style={styles.box_input} keyboardType='number-pad' value={form.price} onChangeText={(text)=>setForm({...form,price:text})}/>
      </View>

      <View style={styles.box}>
        <Text style={styles.box_heading}>Ram</Text>
        <View style={{marginTop:10}}>
        <SelectList     
        placeholder='Choose Ram'
        setSelected={(val) => setForm({...form,ram:val})} 
        data={Ram} 
        save="value"
    />
        </View>   
      </View>

      <View style={styles.box}>
        <Text style={styles.box_heading}>Storage</Text>
        <View style={{marginTop:10}}>
        <SelectList     
        placeholder='Choose Storage'
        setSelected={(val) => setForm({...form,storage:val})} 
        data={Storage} 
        save="value"
    />
        </View>   
      </View>

      <View style={styles.box}>
        <Text style={styles.box_heading}>PTA Status</Text>
        <View style={{marginTop:10 }}>
        <SelectList 
        placeholder='Select option'
        setSelected={(val) => setForm({...form,pta_status:val})} 
        data={approved} 
        save="value"
    /> 
    </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.box_heading}>Product Condition</Text>
        <View style={{marginTop:10 }}>
        <SelectList 
        placeholder='Select option'
        setSelected={(val) => setForm({...form,product_type:val})} 
        data={Condition} 
        save="value"
    /> 
    </View>
    {
      condition&&
      <View style={{padding:5,paddingVertical:15}}>
       <Text style={{color:color.black,fontWeight:'500',fontSize:15}}>Accessories</Text>
       {/* Box */}
       <View style={styles.check_box_box}>
       <CheckBox
    disabled={false}
    value={toggleAccesories.box}

    onValueChange={(newValue) => setToggleAccesories({...toggleAccesories,box:newValue})}
  />
  <Text style={styles.check_box_text}>Box</Text>
  </View>
  {/* Charger */}
  <View style={styles.check_box_box}>
       <CheckBox
    disabled={false}
    value={toggleAccesories.charger}
    onValueChange={(newValue) => setToggleAccesories({...toggleAccesories,charger:newValue})}
  />
  <Text style={styles.check_box_text}>Charger</Text>
  </View>
  {/* Data Cable */}
  <View style={styles.check_box_box}>
       <CheckBox
    disabled={false}
    value={toggleAccesories.data_cable}
    onValueChange={(newValue) => setToggleAccesories({...toggleAccesories,data_cable:newValue})}
  />
  <Text style={styles.check_box_text}>Data Cable</Text>
  </View>
  {/* Hand free */}
  <View style={styles.check_box_box}>
       <CheckBox
    disabled={false}
    value={toggleAccesories.handfree}
    onValueChange={(newValue) => setToggleAccesories({...toggleAccesories,handfree:newValue})}
  />
  <Text style={styles.check_box_text}>Hand Free</Text>
  </View>
  {/* Kit only */}
  <View style={styles.check_box_box}>
       <CheckBox
    disabled={false}
    value={toggleAccesories.kit_only}
    onValueChange={(newValue) => setToggleAccesories({...toggleAccesories,kit_only:newValue})}
  />
  <Text style={styles.check_box_text}>Kit-only</Text>
  </View>
      </View>
    }
      </View>

      <View style={styles.box}>
        <Text style={styles.box_heading}>Warranty</Text>
        <View style={{marginTop:10 }}>
        <SelectList 
        placeholder='Select option'
        setSelected={(val) => setForm({...form,warranty:val})} 
        data={Warranty} 
        save="value"
    /> 
    </View>
      </View>
{/* Image Upload */}
      <View style={styles.box}>              
        <Text style={styles.box_heading}>Product Image</Text>
        <FlatList
        horizontal
        data={images}
        contentContainerStyle={{paddingVertical:10,zIndex:999}}
        renderItem={({item})=>(
        
        <Image
        style={{width:100,height:100,marginRight:15,zIndex:999,marginVertical:5}}
        source={{uri:item}}
        />
        
        )}
        />
        <Text style={{marginVertical:5,color:'gray'}}>Upload upto 20 images</Text>
       <Button title='Upload image' onPress={ImageUpload}/>
      </View>

      <View style={styles.box}>
        <Text style={styles.box_heading}>Description</Text>
        <TextInput style={[styles.box_input,{height:200,textAlignVertical: "top"}]} multiline={true} value={form.description}
        onChangeText={(text)=>setForm({...form,description:text})}
        />
      </View>

{/* Save Button */}
      <TouchableOpacity style={{backgroundColor:color.orange,width:width-50,height:50,borderRadius:20,marginTop:40,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:color.white,fontWeight:'bold',fontSize:20}}>Save Product</Text>
      </TouchableOpacity>
    </ScrollView>
    </>

  )
}

export default PostAnAd

const styles = StyleSheet.create({
    box:{
        width:width-35,
        justifyContent:'center',
        paddingTop:10,
       
    },
    box_heading:{
        color:color.black,
        fontSize:15,
        padding:5
    },
    box_input:{
      width:'100%',
        borderColor:color.black,
        borderRadius:10,
color:color.black,
        paddingHorizontal:15,
        marginTop:10,
        borderWidth:1,
        borderColor:'#939393'
      
    },
    check_box_box:{flexDirection:'row',alignItems:'center',marginTop:5},
    check_box_text:{color:color.black}
})