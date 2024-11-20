import { View, Text, Image, StyleSheet, FlatList,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {collection, getDocs} from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import Colors from '../../constants/Colors';

export default function Category({category}) {

    const [categoryList, setCategoryList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('Cats')

    useEffect(() => {
        GetCategories()
    }, [])

    //Get the category list from the firestore db
    const GetCategories = async () => {
        setCategoryList([])
        const snapshot = await getDocs(collection(db, "Category"));
        snapshot.forEach((doc) => {
        //   console.log(doc.data());
            setCategoryList(categoryList =>[...categoryList, doc.data()])
        });
    }

  return (
    <View
        style={{
            marginTop: 20,
        }}>
        <Text
        style={{
            fontFamily:'poppins-medium',
            fontSize: 20,
        }}
        >Category</Text>
        <FlatList
            data={categoryList}
            numColumns={4}
            renderItem={({item, index}) => (
                <TouchableOpacity 
                    onPress={() =>{
                        setSelectedCategory(item?.name)
                        category(item?.name)   
                    }}
                    style={{ flex: 1}}>
                    <View style={[
                        styles.container, 
                        selectedCategory === item?.name && styles.selectedCategory
                        ]}>
                        <Image source={{uri: item?.imageUrl}}
                        style={{
                            width: 40,
                            height: 40,

                        }}
                        />
                    </View>
                    <Text
                    style={{
                        fontFamily: 'poppins',
                        textAlign: 'center',
                    }}
                    >{item?.name}</Text>
                </TouchableOpacity>
            )}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.PRIMARY_LIGHT,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.PRIMARY,
        padding: 12,
        margin: 5

    },
    selectedCategory:{
        backgroundColor: Colors.SECONDARY,
        borderColor: Colors.SECONDARY
    }
})
