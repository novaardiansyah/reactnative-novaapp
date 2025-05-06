import React, { useState } from 'react'
import { View, Image, StyleSheet, useWindowDimensions, Text } from 'react-native'
import Logo from '@/assets/images/logo-circle.png'
import CustomInput from '@/components/CustomInput'

const SignInScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { height } = useWindowDimensions()

  return (
    <View style={[styles.root, { marginTop: -(height * 0.1) }]}>
      <Image source={Logo} style={[styles.logo, { height: height * 0.5 }]} resizeMode="contain" /> 

      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Nova Ardiansyah</Text>
      <Text style={{ marginBottom: 20 }}>Masuk ke akun Anda</Text>

      <CustomInput placeholder="Alamat Email" value={email} setValue={setEmail} />
      <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry />
    </View>
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
