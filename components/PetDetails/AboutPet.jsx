import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors'

export default function AboutPet({ pet }) {

    const [readMore, setReadMore] = useState(true)
    // const [showLess, setShowLess] = useState(false)
    return (
        <View
            style={{
                padding: 20
            }}
        >
            <Text
                style={{
                    fontFamily: 'poppins-medium',
                    fontSize: 20
                }}
            >About {pet?.name}</Text>
            <Text
                numberOfLines={readMore ? 3 : 6}
                style={{
                    fontFamily: 'poppins',
                    fontSize: 16,
                    color: Colors.GRAY
                }}
            >{pet?.about} </Text>
            {readMore ? (
                <Pressable onPress={() => setReadMore(false)}>
                    <Text style={{
                        fontFamily: 'poppins-medium',
                        fontSize: 14,
                        color: Colors.SECONDARY
                    }}>Read More</Text>
                </Pressable>
            ) : (
                <Pressable onPress={() => setReadMore(true)}>
                    <Text style={{
                        fontFamily: 'poppins-medium',
                        fontSize: 14,
                        color: Colors.SECONDARY
                    }}>Show Less</Text>
                </Pressable>
            )}
        </View>
    )
}