import React, { useState } from 'react'
import { View, Image, StyleSheet, useWindowDimensions, Text, ScrollView } from 'react-native'
import Logo from '@/assets/images/logo-circle.png'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'

const ConfirmResetPasswordScreen = () => {
  const [codeConfirmation, setCodeConfirmation] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

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
        <Text style={{ marginBottom: 20 }}>Konfirmasi Akun</Text>

        <CustomInput placeholder="Kode Konfirmasi" value={codeConfirmation} setValue={setCodeConfirmation} keyboardType="numeric" />
        <Text style={styles.text}>Kode konfirmasi telah dikirim ke email Anda</Text>
        
        <CustomInput placeholder="New Password" value={newPassword} setValue={setNewPassword} secureTextEntry />
        
        <CustomInput placeholder="Repeat New Password" value={confirmNewPassword} setValue={setConfirmNewPassword} secureTextEntry />

        <CustomButton style={{ marginTop: 10 }} text="Reset Password" onPress={onSignUpPressed} />

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

export default ConfirmResetPasswordScreen
