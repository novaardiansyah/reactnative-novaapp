import React, { useState } from 'react'
import { View, StyleSheet, useWindowDimensions, Text, ScrollView } from 'react-native'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import CustomAuthHeader from '@/components/CustomAuthHeader'
import { useNavigation } from '@react-navigation/native'

const ResetPasswordScreen = () => {
  const navigation = useNavigation()
  const { height } = useWindowDimensions()
  const [email, setEmail] = useState('')

  const onForgotPasswordPressed = () => {
    navigation.navigate('ConfirmResetPassword' as never)
  }

  const onSignInPressed = () => {
    navigation.navigate('SignIn' as never)
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.root, { marginTop: -(height * 0.001) }]}>
        <CustomAuthHeader subtitle="Lupa Password?" />

        <CustomInput placeholder="Alamat Email" value={email} setValue={setEmail} />
        <Text style={styles.text}>Kode konfirmasi akan dikirim ke email Anda</Text>

        <CustomButton style={{ marginTop: 10 }} text="Kirim Kode" onPress={onForgotPasswordPressed} />

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

export default ResetPasswordScreen
