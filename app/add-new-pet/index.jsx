import { useUser } from '@clerk/clerk-expo'
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation, useRouter } from 'expo-router'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { db, storage } from '../../config/FirebaseConfig'
import Colors from '../../constants/Colors'

export default function AddNewPet() {
  
  const navigation = useNavigation()
  const [formData, setFormData] = useState({category:'Cats', sex:'Male'})
  const [gender, setGender] = useState()
  const [categoryList, setCategoryList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState()
  const [image, setImage] = useState()
  const [loader, setLoader] = useState(false)

  const {user} = useUser()
  const router = useRouter()

  useEffect(() => { 
    navigation.setOptions({
      title: 'Add New Pet',
    })
    GetCategories()
  }, [])

    //Get the category list from the firestore db
    const GetCategories = async () => {
        setCategoryList([])
        const snapshot = await getDocs(collection(db, "Category"));
        snapshot.forEach((doc) => {
            //   console.log(doc.data());
            setCategoryList(categoryList => [...categoryList, doc.data()])
        });
    }
    
    // Used to pick an image from the gallery
  const imagePicker = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      // console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
  }

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({
        ...prev,
        [fieldName]: fieldValue
    }))
  }

   const onSubmit = () => {
    if(Object.keys(formData).length != 8){   
        ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
        return;
    }
     UploadImage()
    // console.log(formData)   
    }

    //Upload the image to the firebase storage
    const UploadImage = async () => {
        setLoader(true)
        const response = await fetch(image);
        const blobImage = await response.blob();
        const storageRef = ref(storage, 'images/' + Date.now() + '.jpg');
        
        uploadBytes(storageRef, blobImage).then((snapshot) => {
            console.log('File Uploaded');
        }).then(resp => {
            getDownloadURL(storageRef).then((downloadUrl) => {
                console.log(downloadUrl)
                SaveFormData(downloadUrl)
            } )
        })
    }

    const SaveFormData = async (imageUrl) => {
      const docId = Date.now().toString()
      await setDoc(doc(db, "Pets", docId), {  
        ...formData,
        imageUrl: imageUrl,
        username: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        userImage: user?.imageUrl,
        id: docId
      });
      setLoader(false)
      router.replace('/(tabs)/home')
    }


  return (
    <ScrollView
        style={{
            padding: 20,
        }}
    >
      <Text
        style={{
          fontFamily: 'poppins-medium',
          fontSize: 20,
        }}
      >Add New Pet for adoption</Text>

      <Pressable
        onPress={imagePicker}
      >
        {!image? <Image source={require('./../../assets/images/paws.png')}
            style={styles.img}
        /> :
        <Image source={{uri: image}} 
            style={{
                width: 100,
                height: 100,
                borderRadius: 15,
        }} />}
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput placeholder='Bosco' style={styles.input} 
          onChangeText={(value) => handleInputChange('name',value) }
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Category *</Text>
            <Picker
                style={styles.input}
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) =>{
                    setSelectedCategory(itemValue)
                    handleInputChange('category',itemValue)
                }
                }>
                {categoryList.map((category, index) => (
                    <Picker.Item key={index} label={category.name} value={category.name} />
                ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput style={styles.input} 
          onChangeText={(value) => handleInputChange('breed',value) }
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput style={styles.input} 
          keyboardType='number-pad'
          onChangeText={(value) => handleInputChange('age',value) }
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender *</Text>
            <Picker
                style={styles.input}
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) =>{
                    setGender(itemValue)
                    handleInputChange('sex',itemValue)
                }
                }>
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput style={styles.input} 
          keyboardType='number-pad'
          onChangeText={(value) => handleInputChange('weight',value) }
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput style={styles.input} 
          onChangeText={(value) => handleInputChange('address',value) }
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput style={styles.input} 
          numberOfLines={5}
          multiline={true}
          onChangeText={(value) => handleInputChange('about',value) }
        />
      </View>

      <TouchableOpacity 
        style={styles.button}
        disabled={loader}
        onPress={onSubmit}>
        {loader ? <ActivityIndicator size={'large'} /> :
          <Text
            style={{
                fontFamily: 'poppins-medium',
                fontSize: 18,
                color: Colors.WHITE,
                textAlign: 'center'
            }}
        >Submit</Text>
         }
      
      </TouchableOpacity>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
    inputContainer:{
      marginVertical: 5
    },
    input:{
      fontFamily: 'poppins',
      padding:10,
      backgroundColor: Colors.WHITE,
      borderRadius: 7
    },
    label:{
      fontFamily: 'poppins',
      marginVertical: 5
    },
    button:{
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        borderRadius: 7,
        marginVertical: 10,
        marginBottom: 40
    },
    img:{
        width: 100,
        height: 100,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.GRAY
    }
})