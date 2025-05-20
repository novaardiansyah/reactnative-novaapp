import { CustomFormSection, CustomTextInput } from '@/components/CustomPaper';
import { safeRequest } from '@/helpers/UtilsHelper';
import { API_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import Toast from 'react-native-toast-message';

interface AddNoteScreenProps {}

const AddNoteScreen = (props: AddNoteScreenProps) => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, setError } = useForm()

  const navigation = useNavigation();

  const onBackPressed = () => {
    navigation.goBack();
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

    control._reset()

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
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.BackAction onPress={onBackPressed} size={22} />
        <Appbar.Content title="Buat Daftar Catatan" titleStyle={{ fontSize: 16 }} />
      </Appbar.Header>
      
      <ScrollView style={styles.container}>
        <CustomFormSection formType="add" addOrEditAction={handleSubmit(onSavePressed)} addOtherAction={handleSubmit(saveNote)} loading={loading}>
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
