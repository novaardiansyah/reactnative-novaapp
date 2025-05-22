import { CustomAppBar, CustomFormSection, CustomTextInput } from '@/components/CustomPaper';
import { safeRequest } from '@/helpers/UtilsHelper';
import { API_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';

interface AddNoteScreenProps {}

const AddNoteScreen = (props: AddNoteScreenProps) => {
  const [loading, setLoading] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const { control, handleSubmit, setError, reset } = useForm()

  const navigation = useNavigation();

  const onReset = () => {
    setFormKey(formKey + 1)
    reset()
  }

  const saveNote = async (data: any): Promise<boolean> => {
    setLoading(true)

    const result = await safeRequest({
      url: `${API_URL}/notes`,
      method: 'post',
      data,
    })

    setLoading(false)

    if (result.status !== 201) {
      if (result.data?.errors) {
        Object.entries(result.data.errors).forEach(([key, msg]) => setError(key, { message: msg as string }))
      } else {
        Toast.show({
          type: 'error',
          text1: result?.data?.message || 'Internal server error',
          visibilityTime: 4000
        })
      }
      return false
    }

    onReset()

    Toast.show({
      type: 'success',
      text1: result?.data?.message || 'Catatan berhasil disimpan',
    })

    return true
  }

  const onSavePressed = async (data: any) => {
    const save = await saveNote(data)
    if (save) navigation.goBack()
  }

  return (
    <>
      <CustomAppBar title="Buat Daftar Catatan" />
      
      <ScrollView style={styles.container}>
        <CustomFormSection formType="add" addOrEditAction={handleSubmit(onSavePressed)} addOtherAction={handleSubmit(saveNote)} loading={loading} key={formKey}>
          <CustomTextInput 
            name="title"
            label="Judul Catatan" 
            markRequired
            rows={1}
            control={control}
          />

          <CustomTextInput 
            name="description"
            label="Keterangan" 
            markRequired
            rows={2}
            maxRows={10}
            control={control}
          />
        </CustomFormSection>
      </ScrollView>
    </>
  );
};

export default AddNoteScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  }
});
