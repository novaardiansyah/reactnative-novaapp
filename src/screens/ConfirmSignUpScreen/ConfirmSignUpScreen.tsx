import React, { useEffect, useState } from 'react'
import { View, StyleSheet, useWindowDimensions, Text, ScrollView, ActivityIndicator } from 'react-native'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import CustomAuthHeader from '@/components/CustomAuthHeader'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL, APP_DEBUG } from '@env'
import { safeRequest } from '@/helpers/UtilsHelper'
import Toast from 'react-native-toast-message'

const ConfirmSignUpScreen = () => {
  const navigation = useNavigation()
  const [cooldown, setCooldown] = useState(0);
  const [countCooldown, setCountCooldown] = useState(60);
  const { control, handleSubmit, setError } = useForm<ConfirmSignUpFormData>()
  const { height } = useWindowDimensions()
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [cooldown]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getPendingVerify = async () => {
        const pendingVerify = await AsyncStorage.getItem('confirmSignUp')
        if (!pendingVerify) navigation.navigate('SignIn' as never)
        setUserId(pendingVerify)
      }

      getPendingVerify()
      setCooldown(countCooldown)
    })

    return unsubscribe
  }, [navigation, countCooldown])

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

    const result = await safeRequest({
      url: `${API_URL}/auth/verify-email`,
      method: 'post',
      data,
    });
    setLoading(false)

    control._reset()

    if (result.status !== 200) {
      let error = result.data?.message || 'Terjadi kesalahan, silakan coba lagi.'
      return Toast.show({
        type: 'error',
        text1: error,
      })
    }

    setLoading(true)
    
    Toast.show({
      type: 'success',
      text1: 'Pendaftaran berhasil',
      text2: 'Akun Anda telah dikonfirmasi. Silakan masuk.',
      visibilityTime: 3000,
      onHide: async () => {
        setLoading(false)
        await AsyncStorage.removeItem('confirmSignUp')
        navigation.navigate('SignIn' as never)
      },
    });

    return
  }

  const onResendCodePressed = async () => {
    if (APP_DEBUG) console.log('onResendCodePressed()')
    
    setLoading(true)

    const data = {
      user_id: userId,
      type: 'register',
    }

    const result = await safeRequest({
      url: `${API_URL}/auth/resend-verify-email`,
      method: 'post',
      data,
    });

    setLoading(false)

    if (result.status !== 200) {
      let error = result.data?.message || 'Terjadi kesalahan, silakan coba lagi.'
      
      return Toast.show({
        type: 'error',
        text1: error,
      })
    }

    setCountCooldown((prev) => prev + 60)
    setCooldown(countCooldown)

    Toast.show({
      type: 'success',
      text1: 'Berhasil mengirim ulang kode konfirmasi',
    })

    return
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

        <CustomButton style={{ marginTop: 10 }} 
          text={loading ? <ActivityIndicator color="#3366FF" /> : cooldown > 0 ? `Kirim ulang kode (${cooldown}s)` : 'Kirim ulang kode'}
          onPress={onResendCodePressed} 
          variant="secondary" 
          disabled={loading || cooldown > 0}
        />

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
