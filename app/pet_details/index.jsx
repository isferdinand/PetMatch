import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet  } from 'react-native';
import PetInfo from '../../components/PetDetails/PetInfo';
import PetSubInfo from '../../components/PetDetails/PetSubInfo';
import AboutPet from '../../components/PetDetails/AboutPet';
import OwnerInfo from '../../components/PetDetails/OwnerInfo';
import Colors from '../../constants/Colors'

export default function PetDetails() {

  const pet = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {  
    // console.log(pet)
    navigation.setOptions({
        headerTransparent: true,
        headerTitle: '',
    })
  }, [])
 
  return (
    <View>
      <ScrollView>
        {/* Pet info*/}
          {/* Send the pet info to the PetInfo component */}
          <PetInfo pet={pet} />
        {/* Pet props */}
          <PetSubInfo pet={pet} />
        {/* About */}
            <AboutPet pet={pet} />
        {/* Owners information */}
            <OwnerInfo pet={pet} />
            <View style={{height:70}}>
            </View>
      </ScrollView>
      {/* Adopt me buttton */}
      <View style={styles?.bottomContainer}>
            <TouchableOpacity style={styles.adoptButton}>
              <Text
                style={{
                  fontFamily:'poppins-medium',
                  fontSize: 20,
                  textAlign:'center',
                }}
              >Adopt Me</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  adoptButton:{
    padding:15,
    backgroundColor: Colors.PRIMARY,
  },
  bottomContainer:{
    position:'absolute',
    width:'100%',
    bottom:0,
  }
})


// export default function PetDetails() {

//     const pet = useLocalSearchParams();
//     const navigation = useNavigation();

//     useEffect(() => {  
//         console.log(pet)
//         navigation.setOptions({
//             headerTransparent: true,
//             headerTitle: '',
//         })
//     }, [])

 
//   return (
//     <View>
//        {/* Pet info*/}
//         <PetInfo pet={pet} />
//        {/* Pet props */}
//         {/* <PetSubInfo pet={pet} /> */}
//        {/* About */}

//        {/* Owners information */}

//        {/* Adopt me buttton */}
//        {/* <Text>{JSON.stringify(pet)}</Text> */}
//        <Text>{JSON.stringify(pet, null, 2)}</Text>
//     </View>
//   )
// }