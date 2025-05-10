import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import SignInScreen from './src/screens/SignInScreen'
import SignUpScreen from '@/screens/SignUpScreen'
import ConfirmSignUpScreen from '@/screens/ConfirmSignUpScreen'

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
       {/* <SignInScreen /> */}
       {/* <SignUpScreen /> */}
       <ConfirmSignUpScreen />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  }
})

export default App