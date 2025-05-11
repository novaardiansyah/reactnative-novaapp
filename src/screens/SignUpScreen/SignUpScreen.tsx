import React, { useState } from 'react'
import { View, StyleSheet, useWindowDimensions, Text, ScrollView } from 'react-native'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import CustomAuthHeader from '@/components/CustomAuthHeader'

const SignUpScreen = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const { height } = useWindowDimensions()
   
  const onSignUpPressed = () => {
    navigation.navigate('ConfirmSignUp' as never)
  }

  const onSignInPressed = () => {
    navigation.navigate('SignIn' as never)
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.root, { marginTop: -(height * 0.001) }]}>
        <CustomAuthHeader subtitle="Daftar akun baru" />

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

  text: {
    color: 'gray',
    marginVertical: 10,
  },

  link: {
    color: '#FFC878',
  }
})

export default SignUpScreen
