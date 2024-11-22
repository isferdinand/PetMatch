import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet  } from 'react-native';
import PetInfo from '../../components/PetDetails/PetInfo';
import PetSubInfo from '../../components/PetDetails/PetSubInfo';
import AboutPet from '../../components/PetDetails/AboutPet';
import OwnerInfo from '../../components/PetDetails/OwnerInfo';
import Colors from '../../constants/Colors'
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, setDoc, where, doc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';

export default function PetDetails() {

  const pet = useLocalSearchParams();
  const navigation = useNavigation();
  const {user} = useUser()
  const router = useRouter()

  useEffect(() => {  
    // console.log(pet)
    navigation.setOptions({
        headerTransparent: true,
        headerTitle: '',
    })
  }, [])


  /*
  Used to initiate a chat between the user and the pet owner
  */
  const InitiateChat = async () => {
      const docId1 = user?.primaryEmailAddress?.emailAddress+ '_'+ pet?.email;
      const docId2 = pet?.email+ '_'+ user?.primaryEmailAddress?.emailAddress;

      const q = query(collection(db, 'Chat'), where('id', 'in', [docId1, docId2]));
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(doc => {
        console.log(doc.data())
        router.push({
          pathname: '/chat',
          params: {id:doc.id}
      })
      })

      if(querySnapshot.docs?.length==0)
      {
        await setDoc(doc(db, 'Chat', docId1), {
          id:docId1,
          users: [
            {
              email: user?.primaryEmailAddress?.emailAddress,
              imageUrl: user?.imageUrl,
              name: user?.fullName
            },
            {
              email: pet?.email,
              imageUrl: pet?.userImage,
              name: pet?.username
            }
          ],
          userIds:[user?.primaryEmailAddress?.emailAddress, pet?.email]
        })
        router.push({ 
          pathname: '/chat',
          params: {id:docId1}
        })
      }
  }
 
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
            <TouchableOpacity 
              style={styles.adoptButton}
              onPress={InitiateChat}
            >
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