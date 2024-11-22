import { useUser } from '@clerk/clerk-expo'
import { collection, where, getDocs } from 'firebase/firestore'
import React, { useEffect, useState} from 'react'
import { FlatList, Text, View } from 'react-native'
import {query} from 'firebase/database'
import { db } from './../../config/FirebaseConfig'
import UserItem from '../../components/inbox/UserItem'

export default function Inbox() {

  const {user} = useUser()
  const [userList, setUserList] = useState([])
  const [loader, setLoader] = useState(false)

  useEffect(() => {
   user && GetUserList()
  }, [user])

  //Get the user list, depends on current user Emails
  const GetUserList = async () => {
    setLoader(true)
    setUserList([])
    const q = query(collection(db, 'Chat'), 
    where('userIds', 'array-contains', user?.primaryEmailAddress?.emailAddress))

    const querySnapshot = await getDocs(q)  
    querySnapshot.forEach((doc) => {
      setUserList(prevList => [...prevList, doc.data()])
    })
    setLoader(false)
  }

  //Filter the list of other users in one state
  const MapOtherUserList = () => {
    const list = []
    // remember to change == to !==
    userList.forEach((record) => {
      const otherUser = record.users?.filter((user) => user?.email !== user?.primaryEmailAddress?.emailAddress)
      const result = {
        docId: record?.id,
        ...otherUser[0]
      }
      list.push(result)
    })
    return list
  }



  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: 'poppins-medium',
          fontSize: 28,
        }}
      >Inbox</Text>
      <FlatList 
        data={MapOtherUserList()}
        refreshing={loader}
        onRefresh={GetUserList}
        style={{
          marginTop: 20,
        }}
        renderItem={({item, index}) => (
          <UserItem userInfo={item} key={index} />
        )}
      />
    </View>
  )
}