import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../../constants/Colors'
import MarkFav from '../MarkFav'

export default function PetListItem({pet}) {

  const router = useRouter()

  return (
    <TouchableOpacity
        onPress={() => router.push({
            // pathname: 'PetDetailss',
            pathname: '/pet_details',
            params:pet 
        })}
        style={{
            padding: 10,
            marginRight: 15,
            backgroundColor: Colors.WHITE,
            borderRadius: 10,
        }}
    >
      <View
        style={{
          position: 'absolute',
          zIndex:10,
          top: 5,
          right: 4,
        }}
      >
        <MarkFav pet={pet} color={'white'}/>
      </View>
      <Image source={{uri: pet?.imageUrl}}
        style={{
          width: 150,
          height: 130,
          objectFit: 'cover',
          borderRadius: 10,
        }}
        />
        <Text
        style={{
            fontFamily: 'poppins-medium',
            fontSize: 18,
        }}
        >{pet?.name}</Text>
        <View 
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
            <Text
             style={{
                color: Colors.GRAY,
                fontFamily: 'poppins',
             }}
            >{pet?.breed}</Text>
            <Text
                style={{
                    fontFamily: 'poppins',
                    fontSize: 12,
                    color: Colors.PRIMARY,
                    backgroundColor: Colors.PRIMARY_LIGHT,
                    paddingHorizontal: 4,
                    borderRadius: 5,
                }}
            >{pet?.age} Yrs</Text>
        </View>
    </TouchableOpacity>
  )
}

// onPress={() => {
//   try {
//     router.push({
//       pathname: '/pet_details',
//       params: { pet }, // Ensure params are correctly structured
//     });
//   } catch (error) {
//     console.error('Navigation error:', error);
//   }
// }}