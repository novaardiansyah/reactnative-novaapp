import React, { useEffect, useState } from 'react'
import { View, StyleSheet, useWindowDimensions, Text, ScrollView, ActivityIndicator } from 'react-native'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import CustomAuthHeader from '@/components/CustomAuthHeader'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { APP_DEBUG } from '@env'

const ConfirmSignUpScreen = () => {
  const navigation = useNavigation()
  const [codeConfirmation, setCodeConfirmation] = useState('')
  const { control, handleSubmit, setError } = useForm<ConfirmSignUpFormData>()
  const { height } = useWindowDimensions()
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getPendingVerify = async () => {
      const pendingVerify = await AsyncStorage.getItem('confirmSignUp')
      if (!pendingVerify) navigation.navigate('SignIn' as never)
      setUserId(pendingVerify)
    }

    getPendingVerify()
    console.log(userId)
  }, [])

  type ConfirmSignUpFormData = {
    otp: string;
    user_id: string | null;
    type: string;
  }

  const onConfirmPressed = async (data: ConfirmSignUpFormData) => {
    if (APP_DEBUG) console.log('onConfirmPressed()')
    setLoading(true)

    data.user_id = userId
    data.type = 'register'

    console.log(data)
    setLoading(false)
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

        <CustomInput name="otp" placeholder="Kode Konfirmasi" keyboardType="numeric" 
          control={control} 
          rules={{
            required: 'Kode konfirmasi harus diisi',
            minLength: { value: 4, message: 'Kode konfirmasi minimal 4 karakter' },
            maxLength: { value: 4, message: 'Kode konfirmasi maksimal 4 karakter' },
          }}
        />

        <Text style={styles.text}>Kode konfirmasi telah dikirim ke email Anda</Text>

        <CustomButton style={{ marginTop: 15 }} 
          text={loading ? <ActivityIndicator color="#fff" /> : 'Konfirmasi'}
          disabled={loading}
          onPress={handleSubmit(onConfirmPressed)} 
        />

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
