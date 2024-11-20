import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { db } from '../../config/FirebaseConfig'
import Shared from './../../shared/Shared'
import PetListItem from '../../components/Home/PetListItem'

export default function Favorite() {

  const  {user} = useUser()

  const [favIds, setFavIds] = useState([])
  const [favPetList, setFavPetList] = useState([])
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    user && GetFavPetIds()
  }, [user])

  //fetch data
  //Fav Ids
  const GetFavPetIds = async () => {
    setLoader(true)
    const result = await Shared.GetFavList(user)
    setFavIds(result?.favorites)
    setLoader(false)

    GetFavPetList(result?.favorites)
  }

  //Fetch related pet list data
  const GetFavPetList = async (favId_) => {
    setLoader(true)
    setFavPetList([])
    const q = query(collection(db, 'Pets'), where('id', 'in', favId_))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => { 
      console.log(doc.id, ' => ', doc.data())
      setFavPetList(prev => [...prev, doc.data()])
    })
    setLoader(false)
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
          fontSize: 24,
        }}
      >Favorites</Text>

      <FlatList
        data={favPetList}
        numColumns={2}
        onRefresh={() => GetFavPetIds()}
        refreshing={loader}
        renderItem={({ item, index }) => (
          <View>
            <PetListItem pet={item} />
          </View>
        )}
      />
    </View>
  )
}