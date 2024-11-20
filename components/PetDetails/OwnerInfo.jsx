import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function OwnerInfo({pet}) {
  return (
    <View style={styles.container}>
      <View
        style={{
            display:'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20
        }}
      >
        <Image source={{uri: pet?.userImage}} 
            style={{
                width:60,
                height: 60,
                borderRadius:99
            }}
        />
        <View>
            <Text
                style={{
                    fontFamily: 'poppins-medium',
                    fontSize: 16,
                }}
            >{pet?.userName}</Text>
            <Text
                style={{
                    fontFamily:'poppins',
                    color: Colors.GRAY
                }}
            >Pet Owner</Text>
        </View>
      </View>
        <Ionicons name="send-sharp" size={24} color={Colors.PRIMARY} />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.WHITE,
        marginHorizontal:20,
        paddingHorizontal:20,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        gap:10,
        borderWidth:1,
        borderColor: Colors.PRIMARY,
        borderRadius:15,
        padding: 10
    }
})