import { useUser } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import Shared from './../shared/Shared';


export default function MarkFav({ pet, color='black' }) {

  const { user } = useUser()
  const [favList, setFavList] = useState([]) // Corrected state initialization

  useEffect(() => {
    user && GetFav()
  }, [user])

  const GetFav = async () => {
    const result = await Shared.GetFavList(user)
    // console.log(result)
    setFavList(result?.favorites ? result?.favorites : [])
  }
  
  const AddToFav = async () => {
    const favResult = [...favList] // Create a copy of favList
    favResult.push(pet?.id)
    // console.log(pet?.id)
    await Shared.UpdateFav(user, favResult)
    GetFav()
  }

  const removeFromFav = async () => { 
    const favResult = favList.filter(item => item!= pet?.id) 
    // const favResult = [...favList].filter(item => item!= pet?.id) // Create a copy of favList
    // const index = favResult.indexOf(pet?.id)
    // if (index > -1) {
    //   favResult.splice(index, 1)
    // }
    await Shared.UpdateFav(user, favResult)
    GetFav()
  }

  return (
    <View>
      {favList?.includes(pet?.id) ?
        <Pressable
          onPress={() => removeFromFav()}
        >
          <Ionicons name="heart" size={30} color="red" />
        </Pressable> :
        <Pressable
          onPress={() => AddToFav()}
        >
          <Ionicons name="heart-outline" size={30} color={color} />
        </Pressable>}
    </View>
  )
}


// export default function MarkFav({pet}) {

//     const { user } = useUser()
//     const { favList, setFavList } = useState()

//     useEffect(() => {
//         user && GetFavorite()
//     }, [user])

//     const GetFavorite = async () => {
//         const result = await Shared.GetFavoriteList(user)
//         console.log(result)
//         setFavList(result?.favorites ? result?.favorites : [])
//     }

//     const AddToFavorite = async () => {
//         const favResult = favList
//         favResult.push(pet?.id)
//         await Shared.UpdateFavorite(user, favResult)
//         GetFavorite()
//     }

//     return (
//         <View>
//             {favList?.includes(pet?.id) ?
//             <Pressable>
//                 <Ionicons name="heart" size={30} color="red" />
//             </Pressable>:
//             <Pressable
//                 onPress={() => AddToFavorite()}
//             >
//                 <Ionicons name="heart-outline" size={30} color="black" />
//             </Pressable>}
//         </View>
//     )
// }