import React, { useState } from 'react'
import { View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import CustomAuthHeader from '@/components/CustomAuthHeader'
import { useForm } from 'react-hook-form'

const SignInScreen = () => {
  const navigation = useNavigation()
  const { height } = useWindowDimensions()
  const { control, handleSubmit, formState: {errors}, setError } = useForm()
  
  const onSignInPressed = (data: object) => {
    // navigation.navigate('Home' as never)
    setError('email', { message: 'Email atau password salah.' })
  }

  const onForgotPasswordPressed = () => {
    navigation.navigate('ResetPassword' as never)
  }

  const onSignUpPressed = () => {
    navigation.navigate('SignUp' as never)
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.root, { marginTop: -(height * 0.001) }]}>
        <CustomAuthHeader subtitle="Masuk ke akun Anda" />

        <CustomInput name="email" placeholder="Alamat Email" control={control} 
          rules={{ 
            required: 'Alamat email tidak boleh kosong.',
            pattern: {value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message:  'Alamat email tidak valid.'} 
          }} 
        />

        <CustomInput name="password" placeholder="Password" control={control} 
          rules={{ required: 'Password tidak boleh kosong.' }} 
          secureTextEntry 
        />
        
        <CustomButton style={{ marginTop: 10 }} text="Masuk" onPress={handleSubmit(onSignInPressed)} />
        <CustomButton style={{ marginTop: 5 }} text="Lupa Password?" onPress={onForgotPasswordPressed} variant="tertiary" />
        <CustomButton style={{ marginTop: -20 }} text="Belum punya akun? Daftar sekarang" onPress={onSignUpPressed} variant="tertiary" />
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
})

export default SignInScreen
