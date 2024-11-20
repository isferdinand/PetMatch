import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import MarkFav from '../MarkFav'


export default function PetInfo({pet}) {
  return (
    <View>
      <Image source={{uri: pet?.imageUrl}} 
        style={{
          width: '100%',
          height: 400,
          resizeMode: 'cover',
        }}
      />
      <View
        style={{
          padding: 20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
            <Text
            style={{
                fontFamily: 'poppins-bold',
                fontSize: 25,
            }}
            >{pet?.name}</Text>
            <Text
                style={{
                    fontFamily: 'poppins',
                    fontSize: 16,
                    color: Colors.GRAY,
                }}
            >{pet?.address}</Text>
        </View>
        <MarkFav pet={pet} />
      </View>
    </View>
  )
}

// export default function PetInfo({pet}) {
//   return (
//     <View>
//       <Image source={{uri: pet?.imageUrl}} 
//         style={{
//           width: '100%',
//           height: 400,
//           resizeMode: 'cover',
//         }}
//       />
//       <View
//         style={{
//           padding: 20,
//           display: 'flex',
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//         }}
//       >
//         {/* <View><Text>{JSON.stringify(pet)}</Text></View> */}
//         <View>
//             <Text
//             style={{
//                 fontFamily: 'poppins-bold',
//                 fontSize: 25,
//             }}
//             >{pet?.name}</Text>
//             <Text
//                 style={{
//                     fontFamily: 'poppins',
//                     fontSize: 16,
//                     color: Colors.GRAY,
//                 }}
//             >{pet?.address}</Text>
//         </View>
//         <Ionicons name="heart-outline" size={30} color="black" />     
//       </View>
//     </View>
//   )
// }