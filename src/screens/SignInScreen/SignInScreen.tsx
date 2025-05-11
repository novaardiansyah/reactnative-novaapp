import React, { useState } from 'react'
import { View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import CustomAuthHeader from '@/components/CustomAuthHeader'
const SignInScreen = () => {
  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { height } = useWindowDimensions()
   
  const onSignInPressed = () => {
    navigation.navigate('Home' as never)
  }

  const onForgotPasswordPressed = () => {
    navigation.navigate('ResetPassword' as never)
  }

  const onSignUpPressed = () => {
    navigation.navigate('SignUp' as never)
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.root, { marginTop: -(height * 0.001) }]}>
        <CustomAuthHeader subtitle="Masuk ke akun Anda" />

        <CustomInput placeholder="Alamat Email" value={email} setValue={setEmail} />
        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry />

        <CustomButton style={{ marginTop: 10 }} text="Masuk" onPress={onSignInPressed} />
        <CustomButton style={{ marginTop: 5 }} text="Lupa Password?" onPress={onForgotPasswordPressed} variant="tertiary" />
        <CustomButton style={{ marginTop: -20 }} text="Belum punya akun? Daftar sekarang" onPress={onSignUpPressed} variant="tertiary" />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    paddingHorizontal: 20,
  },
})

export default SignInScreen
