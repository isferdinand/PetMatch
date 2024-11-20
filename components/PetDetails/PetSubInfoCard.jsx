import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

export default function PetSubInfoCard({pet, icon, title, value}) {
    return (
        <View
            style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.WHITE,
            padding: 10,
            margin:5,
            borderRadius:8,
            gap:10,
            flex:1
            }}
         >
            <Image source={icon} 
                style={{
                    width: 40,
                    height: 40,
                }}
            />
            <View>
                <Text
                    style={{
                    fontFamily: 'poppins',
                    fontSize: 16,
                    color: Colors.PRIMARY,
                    }}
                >{title}</Text>
                <Text
                    style={{
                    fontFamily: 'poppins-medium',
                    fontSize: 18,
                    }}
                >{value}</Text>
            </View>
      </View>
    )
}