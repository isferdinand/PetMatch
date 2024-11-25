import { useUser } from '@clerk/clerk-expo'
import { useNavigation } from 'expo-router'
import { query } from 'firebase/database'
import { collection, deleteDoc, doc, getDocs, where } from 'firebase/firestore'
import React, { useEffect, useState} from 'react'
import { FlatList, Pressable, Text, View, StyleSheet, Alert } from 'react-native'
import { db } from './../../config/FirebaseConfig'
import PetListItem from '../../components/Home/PetListItem'
import Colors from '../../constants/Colors'

export default function UserPost() {

  const navigation = useNavigation()
  const {user} = useUser()
  const [userPostList, setUserPostList] = useState([])
  const [loader, setLoader] = useState(false)
  
  useEffect(() => {
    navigation.setOptions({
        headerTitle: 'User Post'
    })
    user && GetUserPost()
  }, [user])

  //Used to get the user posts
  const GetUserPost = async () =>{
    setLoader(true)
    setUserPostList([])
    const q = query(collection(db, 'Pets'), where('email', '==', user?.primaryEmailAddress?.emailAddress))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
    //   console.log(doc.data())
      setUserPostList(prevList => [...prevList, doc.data()])
      })
    setLoader(false)
  }

  const onDeletePost = (docId) => {
    Alert.alert( 'Are you sure? ' ,'Are you sure you want to delete this post?', [
        {
            text: 'No',
            onPress:() => {console.log('Cancel Pressed')},
            style: 'cancel'  
        },
        {
            text: 'Yes',
            onPress: () => console.log('No Pressed'),
            // onPress: () => deletePost(docId),
            
        }
    ])
  } 

  const deletePost = async (docId) => {
    await deleteDoc(doc(db, 'Pets', docId))
    GetUserPost()
  }

  return (
    <View
        style={{
            padding: 20,
        }}
    >
      <Text
        style={{
          fontFamily: 'poppins-medium',
          fontSize: 28,
        }}
      >UserPost</Text>
      <FlatList
        data={userPostList}
        numColumns={2}
        refreshing={loader}
        onRefresh={GetUserPost}
        renderItem={({item, index}) => (
          <View>
            <PetListItem pet={item} key={index}/>
            <Pressable
              onPress={() =>onDeletePost(item?.id)}
              style={styles.deleteButton}
            >
                <Text
                  style={{
                    fontFamily: 'poppins',
                    textAlign: 'center',
                  }}
                >Delete</Text>
            </Pressable>
          </View>
        )}
      />

      {userPostList?.length == 0 && <Text>No post found</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
    deleteButton:{
        backgroundColor:Colors.PRIMARY_LIGHT,
        padding:5,
        borderRadius: 7,
        marginTop: 5,
        marginRight: 10,
    }
})