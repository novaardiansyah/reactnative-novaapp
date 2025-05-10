import React, { useState } from 'react'
import { View, Image, StyleSheet, useWindowDimensions, Text, ScrollView } from 'react-native'
import Logo from '@/assets/images/logo-circle.png'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('')

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
        <Text style={{ marginBottom: 20 }}>Lupa Password</Text>

        <CustomInput placeholder="Alamat Email" value={email} setValue={setEmail} />
        <Text style={styles.text}>Kode konfirmasi akan dikirim ke email Anda</Text>

        <CustomButton style={{ marginTop: 10 }} text="Kirim Kode" onPress={onSignUpPressed} />

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
    alignSelf: 'flex-start',
    marginBottom: 10,
  },

  link: {
    color: '#FFC878',
  }
})

export default ResetPasswordScreen
