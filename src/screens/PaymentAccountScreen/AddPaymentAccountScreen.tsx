import { CustomFormHeader } from '@/components/CustomListHeader'
import { CustomFormSection, CustomTextInput } from '@/components/CustomPaper'
import { logger, safeRequest } from '@/helpers/UtilsHelper'
import { API_URL } from '@env'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, StyleSheet } from 'react-native'
import Toast from 'react-native-toast-message'

interface AddPaymentAccountScreenProps {}

interface FormData {
  name: string
  deposit: number
}

const AddPaymentAccountScreen = (props: AddPaymentAccountScreenProps) => {
  const navigation = useNavigation()

  const [loading, setLoading] = useState(false)
  const { control, handleSubmit, setError, reset } = useForm<FormData>()
  const [formKey, setFormKey] = useState(0)

  const onReset = () => {
    setFormKey(formKey + 1)
    reset()
  }

  const savePressed = async (data: FormData) => {
    setLoading(true)
    
    const deposit = typeof data.deposit === 'string' ? parseFloat(data.deposit) : data.deposit;
    const payload = { ...data, deposit };

    logger(`onSavePressed() called with data:`, payload);
    
    const result = await safeRequest({
      url: `${API_URL}/payment-accounts`,
      method: 'post',
      data: payload,
    })

    setLoading(false)

    if (result.status !== 201) {
      if (result.data?.errors) {
        Object.entries(result.data.errors).forEach(([key, msg]) => setError(key as keyof FormData, { message: msg as string }))
      } else {
        Toast.show({
          type: 'error',
          text1: result.data?.message || 'Internal server error',
          visibilityTime: 4000
        })
      }
      return false
    }

    onReset()

    Toast.show({
      type: 'success',
      text1: result.data.message
    })

    return true
  }

  const onSavePressed = async (data: FormData) => {
    const save = await savePressed(data)
    if (save) navigation.goBack()
  }

  return (
    <>
      <CustomFormHeader 
        title="Buat Akun Kas"
        formType="create"
      />

      <ScrollView style={styles.container}>
        <CustomFormSection formType="add" addOrEditAction={handleSubmit(onSavePressed)} addOtherAction={handleSubmit(savePressed)} loading={loading} key={formKey}>
          <CustomTextInput 
            name="name"
            label="Nama Akun" 
            markRequired
            control={control}
          />

          <CustomTextInput 
            name="deposit"
            label="Total Saldo" 
            markRequired
            keyboardType="numeric"
            control={control}
          />
        </CustomFormSection>
      </ScrollView>
    </>
  )
}

export default AddPaymentAccountScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
})
