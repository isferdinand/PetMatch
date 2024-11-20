import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import ListByCategory from '../../components/Home/ListByCategory' 
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '../../constants/Colors'
import { Link } from 'expo-router'

export default function Home() {
  return (
    <View
    style={{
      padding: 20,
      marginTop: 30,
   }}
    >
      {/* Header */}
        <Header />
      {/* Slider */}
        <Slider />
      {/* PetList + Category */}
        <ListByCategory />
      {/* Add new pets */}
        <Link
          // onPress={}
          href={'/add-new-pet'}
          style={styles.addNewPet}
        >
          <MaterialIcons name="pets" size={24} color={Colors.PRIMARY} />
          <Text
            style={{
              fontFamily: 'poppins-medium',
              fontSize: 18,
              color: Colors.PRIMARY,
            }}  
          >Add new pet</Text>
        </Link>
    </View>
  )
}

const styles = StyleSheet.create({
   addNewPet:{
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: Colors.PRIMARY_LIGHT,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 15,
    borderStyle: 'dashed',
   }
})