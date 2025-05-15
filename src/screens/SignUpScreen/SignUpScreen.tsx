import React, { useEffect, useState } from 'react'
import { View, StyleSheet, useWindowDimensions, Text, ScrollView, ActivityIndicator } from 'react-native'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import CustomAuthHeader from '@/components/CustomAuthHeader'
import { set, useForm } from 'react-hook-form'
import { API_URL, APP_DEBUG } from '@env'
import { safeRequest } from '@/helpers/UtilsHelper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'

const SignUpScreen = () => {
  const navigation = useNavigation()
  const { control, handleSubmit, setError } = useForm<SignUpFormData>()
  const [loading, setLoading] = useState(false)
  const { height } = useWindowDimensions()
  
  type SignUpFormData = {
    email: string;
    password: string;
    name: string;
  }

  const onSignUpPressed = async (data: SignUpFormData) => {
    setLoading(true)

    if (APP_DEBUG) console.log('onSignUpPressed()')

    const name = data.email.split('@')[0]
    data.name = name

    const result = await safeRequest({
      url: `${API_URL}/auth/register`,
      method: 'post',
      data,
    });
    setLoading(false)

    if (result.status !== 201) {
      if (result.data?.errors) {
        let errors = result.data.errors
        for (let key in errors) {
          setError(key as keyof SignUpFormData, { message: errors[key] })
        }
      } else {
        setError('email', { message: result.data.message })
      }

      return
    }

    const { user } = result.data
    
    setLoading(true)

    await AsyncStorage.setItem('confirmSignUp', user.id.toString())
    Toast.show({
      type: 'success',
      text1: 'Pendaftaran berhasil',
      text2: 'Silakan periksa email Anda untuk mengonfirmasi pendaftaran.',
      onHide: () => {
        setLoading(false)
        control._reset()
        navigation.navigate('ConfirmSignUp' as never)
      }
    })

    return
  }

  const onSignInPressed = () => {
    navigation.navigate('SignIn' as never)
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.root, { marginTop: -(height * 0.001) }]}>
        <CustomAuthHeader subtitle="Daftar akun baru" />

        <CustomInput name="email" placeholder="Alamat Email" control={control} 
          rules={{ 
            required: 'Alamat email tidak boleh kosong.',
            pattern: {value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message:  'Alamat email tidak valid.'} 
          }} 
        />
        
        <CustomInput name="password" placeholder="Password" control={control} secureTextEntry 
          rules={{ 
            required: 'Password tidak boleh kosong.',
            minLength: {value: 6, message: 'Password minimal 6 karakter.'}
          }}  
        />

        <CustomInput name="confirmPassword" placeholder="Konfirmasi Password" control={control} secureTextEntry
          rules={{ 
            validate: (value: string) => value === control._formValues.password || 'Konfirmasi password tidak valid.'
          }} 
        />

        <CustomButton style={{ marginTop: 15 }} 
          text={loading ? <ActivityIndicator color="#fff" /> : 'Daftar'}
          disabled={loading}
          onPress={handleSubmit(onSignUpPressed)} 
        />

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
