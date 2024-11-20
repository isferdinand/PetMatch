import { Pressable, Text, View } from "react-native";
import {Link, Redirect, useRootNavigationState} from 'expo-router';
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";

export default function Index() {

  //here you'll get all the user info, who is logged in
  const {user} = useUser();
  // console.log(user)

  // const rootNavigationState = useRootNavigationState();

  // useEffect( () =>{
  //   checkNavLoaded()
  // },[])

  // const checkNavLoaded = () => {
  //   if(!rootNavigationState)
  //     return null  
  // }

  return (
    <View
      style={{
        flex: 1,
      }}
    >

      {user?
        (<Redirect href={'/(tabs)/home'}/>):
        (<Redirect href={'/login'}/>)
      }
    </View>
  );
}
