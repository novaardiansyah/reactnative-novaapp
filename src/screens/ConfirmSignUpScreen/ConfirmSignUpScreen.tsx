import React, { useState } from 'react'
import { View, StyleSheet, useWindowDimensions, Text, ScrollView } from 'react-native'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import CustomAuthHeader from '@/components/CustomAuthHeader'
import { useNavigation } from '@react-navigation/native'

const ConfirmSignUpScreen = () => {
  const navigation = useNavigation()
  const [codeConfirmation, setCodeConfirmation] = useState('')

  const { height } = useWindowDimensions()
   
  const onConfirmPressed = () => {
    console.warn('Sign up')
  }

  const onResendCodePressed = () => {
    console.warn('Resend code')
  }

  const onSignInPressed = () => {
    navigation.navigate('SignIn' as never)
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.root, { marginTop: -(height * 0.001) }]}>
        <CustomAuthHeader subtitle="Konfirmasi Akun" />

        <CustomInput placeholder="Kode Konfirmasi" value={codeConfirmation} setValue={setCodeConfirmation} keyboardType="numeric" />
        <Text style={styles.text}>Kode konfirmasi telah dikirim ke email Anda</Text>

        <CustomButton style={{ marginTop: 10 }} text="Konfirmasi" onPress={onConfirmPressed} />

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

export default ConfirmSignUpScreen
