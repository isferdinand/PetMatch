import React from 'react'
import { Image, Text, View } from 'react-native'
import Colors from '../../constants/Colors'
import { Link } from 'expo-router'

export default function UserItem({userInfo}) {
  return (
    <Link href={'/chat?id=' + userInfo.docId}>
        <View
            style={{
                marginVertical: 8,
                flexDirection: 'row',
                display: 'flex',
                gap: 10,
                alignItems: 'center',
            }}
        >
        <Image source={{uri: userInfo?.imageUrl}} 
            style={{
                width:40,
                height:40,
                borderRadius: 99,
            }}
        />
        <Text
            style={{
                fontFamily: 'poppins',
                fontSize: 20,
            }}
        >{userInfo?.name}</Text>
        </View>
        <View 
          style={{
            borderWidth: 0.3,
            marginVertical:5,
            borderColor: Colors.GRAY,
          }}></View>
    </Link>
  )
}