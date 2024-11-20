import { collection, getDocs, query, where } from 'firebase/firestore'
import React, {useEffect, useState} from 'react'
import { FlatList, Text, View } from 'react-native'
import { db } from '../../config/FirebaseConfig'
import Category from './Category'
import PetListItem from './PetListItem'

export default function ListByCategory() {

  const [petList, setPetList] = useState([])
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    GetPetList('Cats')
  }, [])

/**
 * Use to get the list of pets based on the category selection
 * @param {*} category 
 */
  const GetPetList = async (category) => {  
    setLoader(true)
    setPetList([])
    const q = query(collection(db, "Pets"), where("category", "==", category));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setPetList(petList =>[...petList, doc.data()])
    });

    setLoader(false)
  }

  return (
    <View>
      <Category category={(value) => GetPetList(value)} />
      <FlatList
        data={petList}
        style={{marginTop: 15}} 
        horizontal={true}
        refreshing={loader}
        onRefresh={() => GetPetList('Cats')}
        renderItem={({item, index}) => (
          <PetListItem pet={item} />
        )}
      />
    </View>
  )
}