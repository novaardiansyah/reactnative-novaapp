import { CustomFormHeader } from '@/components/CustomListHeader'
import { CustomFormSection, CustomTextInput } from '@/components/CustomPaper'
import { RootStackParamList } from '@/navigation/types'
import { RouteProp } from '@react-navigation/native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, StyleSheet } from 'react-native'

type PaymentAccountScreenNavigationProp = RouteProp<RootStackParamList, 'EditPaymentAccount'>

interface EditPaymentAccountScreenProps {
  route: PaymentAccountScreenNavigationProp;
}

interface FormData {
  name: string
  deposit: number
}

const EditPaymentAccountScreen = (props: EditPaymentAccountScreenProps) => {
  const { id } = props.route.params
  const [loading, setLoading] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  
  const { control, handleSubmit, setError, setValue, reset } = useForm<FormData>()
  const [formKey, setFormKey] = useState(0)

  const onDeletePressed = async () => {
    console.debug('onDeletePressed() called for ID:', id)
  }

  const onSavePressed = async (data: FormData) => {
    console.debug('onSavePressed() called with data:', data)
  }

  return (
    <>
      <CustomFormHeader 
        title="Edit Akun Kas"
        formType="edit"
        loading={loading}
        setConfirmDelete={setConfirmDelete} 
        confirmDelete={confirmDelete} 
        onDeletePressed={onDeletePressed}
      />

      <ScrollView style={styles.container}>
        <CustomFormSection formType="edit" addOrEditAction={handleSubmit(onSavePressed)} loading={loading} key={formKey}>
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

export default EditPaymentAccountScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
})
