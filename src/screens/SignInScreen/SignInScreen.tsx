import React, { useState } from 'react'
import { View, Image, StyleSheet, useWindowDimensions, Text, ScrollView } from 'react-native'
import Logo from '@/assets/images/logo-circle.png'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
const SignInScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { height } = useWindowDimensions()
   
  const onSignInPressed = () => {
    console.warn('Sign in')
    console.warn({ email, password })
  }

  const onForgotPasswordPressed = () => {
    console.warn('Forgot Password')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.root, { marginTop: -(height * 0.001) }]}>
        <Image source={Logo} style={[styles.logo, { height: height * 0.5 }]} resizeMode="contain" /> 

        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Nova Ardiansyah</Text>
        <Text style={{ marginBottom: 20 }}>Masuk ke akun Anda</Text>

        <CustomInput placeholder="Alamat Email" value={email} setValue={setEmail} />
        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry />

        <CustomButton style={{ marginTop: 10 }} text="Masuk" onPress={onSignInPressed} />
        <CustomButton style={{ marginTop: 5 }} text="Lupa Password?" onPress={onForgotPasswordPressed} variant="tertiary" />
        <CustomButton style={{ marginTop: -20 }} text="Belum punya akun? Daftar sekarang" onPress={onForgotPasswordPressed} variant="tertiary" />
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

  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 100,
    
    marginBottom: 10,
  },
})

export default SignInScreen
