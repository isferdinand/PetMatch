import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'

export default function Header() {

  const {user} = useUser()

  return (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }}
    >
        <View>
          <Text
           style={{
            fontFamily:'poppins',
             fontSize: 18,
           }}
          >Welcome, </Text>
          <Text
          style={{
            fontFamily:'poppins-medium',
            fontSize: 24,
          }}
          >{user?.fullName}</Text>
        </View>
        <Image source={{uri: user?.imageUrl}} 
        style={{
          width: 50,
          height: 50,
          borderRadius: 99,
        }}/>
        
    </View> 
  )
}