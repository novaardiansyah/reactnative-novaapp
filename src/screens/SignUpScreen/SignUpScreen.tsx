import React, { useState } from 'react'
import { View, Image, StyleSheet, useWindowDimensions, Text, ScrollView } from 'react-native'
import Logo from '@/assets/images/logo-circle.png'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'

const SignUpScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const { height } = useWindowDimensions()
   
  const onSignUpPressed = () => {
    console.warn('Sign up')
  }

  const onSignInPressed = () => {
    console.warn('Sign in')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.root, { marginTop: -(height * 0.001) }]}>
        <Image source={Logo} style={[styles.logo, { height: height * 0.5 }]} resizeMode="contain" /> 

        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Nova Ardiansyah</Text>
        <Text style={{ marginBottom: 20 }}>Daftar akun baru</Text>

        <CustomInput placeholder="Alamat Email" value={email} setValue={setEmail} />
        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry />
        <CustomInput placeholder="Konfirmasi Password" value={passwordRepeat} setValue={setPasswordRepeat} secureTextEntry />

        <CustomButton style={{ marginTop: 10 }} text="Daftar" onPress={onSignUpPressed} />

        <Text style={styles.text}>Dengan mendaftar, Anda menyetujui <Text style={styles.link}>Syarat dan Ketentuan</Text> dan <Text style={styles.link}>Kebijakan Privasi</Text></Text>

        <CustomButton style={{ marginTop: 5 }} text="Sudah punya akun? Masuk" onPress={onSignInPressed} variant="tertiary" />
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

  text: {
    color: 'gray',
    marginVertical: 10,
  },

  link: {
    color: '#FFC878',
  }
})

export default SignUpScreen
