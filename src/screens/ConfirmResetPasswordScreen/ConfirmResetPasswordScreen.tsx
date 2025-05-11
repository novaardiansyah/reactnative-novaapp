import React, { useState } from 'react'
import { View, StyleSheet, useWindowDimensions, Text, ScrollView } from 'react-native'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import CustomAuthHeader from '@/components/CustomAuthHeader'
import { useNavigation } from '@react-navigation/native'

const ConfirmResetPasswordScreen = () => {
  const navigation = useNavigation()
  const [codeConfirmation, setCodeConfirmation] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const { height } = useWindowDimensions()
   
  const onResetPasswordPressed = () => {
    console.warn('Reset password')
  }

  const onSignInPressed = () => {
    navigation.navigate('SignIn' as never)
  }

  const onResendCodePressed = () => {
    console.warn('Resend code')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.root, { marginTop: -(height * 0.001) }]}>
        <CustomAuthHeader subtitle="Reset Password" />

        <CustomInput placeholder="Kode Konfirmasi" value={codeConfirmation} setValue={setCodeConfirmation} keyboardType="numeric" />
        <Text style={styles.text}>Kode konfirmasi telah dikirim ke email Anda</Text>
        
        <CustomInput placeholder="Password Baru" value={newPassword} setValue={setNewPassword} secureTextEntry />
        
        <CustomInput placeholder="Konfirmasi Password Baru" value={confirmNewPassword} setValue={setConfirmNewPassword} secureTextEntry />

        <CustomButton style={{ marginTop: 10 }} text="Reset Password" onPress={onResetPasswordPressed} />

        <CustomButton style={{ marginTop: 10 }} text="Kirim ulang kode" onPress={onResendCodePressed} variant="secondary" />

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
})

export default ConfirmResetPasswordScreen
