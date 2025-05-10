import React, { useState } from 'react'
import { View, Image, StyleSheet, useWindowDimensions, Text, ScrollView } from 'react-native'
import Logo from '@/assets/images/logo-circle.png'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'

const ConfirmSignUpScreen = () => {
  const [codeConfirmation, setCodeConfirmation] = useState('')

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
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Konfirmasi Akun</Text>
        <Text style={{ marginBottom: 20 }}>Konfirmasi Akun</Text>

        <CustomInput placeholder="Kode Konfirmasi" value={codeConfirmation} setValue={setCodeConfirmation} keyboardType="numeric" />
        <Text style={styles.text}>Kode konfirmasi telah dikirim ke email Anda</Text>

        <CustomButton style={{ marginTop: 10 }} text="Konfirmasi" onPress={onSignUpPressed} />

        <CustomButton style={{ marginTop: 10 }} text="Kirim ulang kode" onPress={onSignUpPressed} variant="secondary" />

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

  text: {
    color: 'gray',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },

  link: {
    color: '#FFC878',
  }
})

export default ConfirmSignUpScreen
