import React, { useContext, useState } from 'react'
import { View, StyleSheet, useWindowDimensions, ScrollView, ActivityIndicator, Text } from 'react-native'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import CustomAuthHeader from '@/components/CustomAuthHeader'
import { useForm } from 'react-hook-form'
import { AuthContext } from '@/context/AuthContext'

const SignInScreen = () => {
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const { height } = useWindowDimensions()
  const { control, handleSubmit, setError } = useForm()
  const { login } = useContext(AuthContext)
  
  const onSignInPressed = async (data: object) => {
    console.log('onSignInPressed()')
    setLoading(true)

    let auth = await login(data)
    setLoading(false) 

    if (auth.status !== 200) {
      if (auth.data?.errors) {
        let errors = auth.data.errors
        for (let key in errors) {
          setError(key, { message: errors[key] })
        }
      } else {
        setError('email', { message: auth.data.message })
      }
    }

    return;
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
      
        <CustomButton style={{ marginTop: 15 }} 
          text={loading ? <ActivityIndicator color="#fff" /> : 'Masuk'}
          disabled={loading}
          onPress={handleSubmit(onSignInPressed)} 
        />

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
