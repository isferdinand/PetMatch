import { View, Text, Image, Pressable, Link } from 'react-native'
import React, {useCallback} from 'react'
import Colors from '../../constants/Colors'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function Login() {

  useWarmUpBrowser()
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
        
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])

  return (
    <View
        style={{
            backgroundColor: Colors.WHITE,
            height: '100%',
        }}
    >
      <Image source={require('../../assets/images/login.png')}
        style={{
          width: '100%',
          height: 500,
        }}
      />
      <View
        style={{
          padding: 20,
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        <Text 
        style={{
            fontFamily: 'poppins-bold',
            fontSize: 28,
            textAlign: 'center',
        }}
        >Ready to make a new friend?</Text>
        <Text
        style={{
            fontFamily: 'poppins',
            fontSize: 18,
            textAlign: 'center',
            marginTop: 5,
            color: Colors.GRAY
        }}
        >Let's adopt the pet which you like and make both your life and theres' happy.</Text>
        
        <Pressable
            onPress={onPress}
            style={{
                backgroundColor: Colors.PRIMARY,
                padding: 14,
                borderRadius: 5,
                marginTop: 100,
                borderRadius: 14,
                width: '100%',
            }}
        >
         <Text
            style={{
                fontFamily: 'poppins-medium',
                fontSize: 20,
                textAlign: 'center',
            }}
         >Get Started</Text>
        </Pressable>
      </View>
      {/* <Link>yes</Link> */}
    </View>
  )
}