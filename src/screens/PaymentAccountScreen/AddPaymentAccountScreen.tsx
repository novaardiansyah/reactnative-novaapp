import { CustomFormHeader } from '@/components/CustomListHeader'
import { CustomFormSection, CustomTextInput } from '@/components/CustomPaper'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, StyleSheet } from 'react-native'

interface AddPaymentAccountScreenProps {}

interface FormData {
  name: string
  deposit: number
}

const AddPaymentAccountScreen = (props: AddPaymentAccountScreenProps) => {
  const [loading, setLoading] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  
  const { control, handleSubmit, setError, setValue, reset } = useForm<FormData>()
  const [formKey, setFormKey] = useState(0)

  const onSavePressed = async (data: FormData) => {
    console.debug('onSavePressed() called with data:', data)
  }

  return (
    <>
      <CustomFormHeader 
        title="Buat Akun Kas"
        formType="create"
      />

      <ScrollView style={styles.container}>
        <CustomFormSection formType="add" addOrEditAction={handleSubmit(onSavePressed)} loading={loading} key={formKey}>
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
