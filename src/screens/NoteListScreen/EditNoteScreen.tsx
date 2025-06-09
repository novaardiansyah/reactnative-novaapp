import { CustomFormSection, CustomTextInput } from '@/components/CustomPaper'
import { safeRequest, stripHtml } from '@/helpers/UtilsHelper'
import { API_URL, APP_DEBUG } from '@env'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, ScrollView } from 'react-native'
import Toast from 'react-native-toast-message'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '@/navigation/types'
import { CustomFormHeader } from '@/components/CustomListHeader'

type NoteEditRouteProp = RouteProp<RootStackParamList, 'NoteEdit'>;

interface EditNoteScreenProps {
  route: NoteEditRouteProp;
}

const EditNoteScreen = (props: EditNoteScreenProps) => {
  const { id } = props.route.params
  const [loading, setLoading] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const { control, handleSubmit, setError, setValue, reset } = useForm()
  const [data, setData] = useState<any>({})
  const [confirmDelete, setConfirmDelete] = useState(false)

  const navigation = useNavigation();

  const onReset = () => {
    setFormKey(formKey + 1)
    reset()
  }

  const fetchData = async () => {
    console.log('fetchData()')

    setLoading(true)
    
    const result = await safeRequest({
      url: `${API_URL}/notes/${id}`,
      method: 'get',
    });

    if (result.status !== 200) {
      if (APP_DEBUG) console.debug('Error fetching data:', result)
      
      Toast.show({
        type: 'error',
        text1: result?.data?.message || 'Internal server error',
        visibilityTime: 4000,
        onHide: () => navigation.goBack()
      })

      return
    }
    
    setData(result.data?.data || {})

    setLoading(false)
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData()
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    if (data) {
      setValue('title', data.title)
      setValue('description', stripHtml(data.description))
    }
  }, [data])

  const onSavePressed = async (data: any): Promise<boolean> => {
    setLoading(true)

    const result = await safeRequest({
      url: `${API_URL}/notes/${id}`,
      method: 'put',
      data,
    })
    
    if (result.status !== 200) {
      setLoading(false)

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
    navigation.goBack()

    Toast.show({
      type: 'success',
      text1: result?.data?.message || 'Catatan berhasil diperbarui',
    })
    
    return true
  }

  const onDeletePressed = async () => {
    setLoading(true)
    setConfirmDelete(false)
    
    const result = await safeRequest({
      url: `${API_URL}/notes/${id}`,
      method: 'delete',
    })
    
    if (result.status !== 200) {
      setLoading(false)
      Toast.show({
        type: 'error',
        text1: result?.data?.message || 'Internal server error',
        visibilityTime: 4000
      })
      return
    }

    navigation.goBack()
    
    Toast.show({
      type: 'success',
      text1: result?.data?.message || 'Catatan berhasil dihapus',
    })
  }

  return (
    <>
      <CustomFormHeader 
        title="Edit Daftar Catatan"
        formType="edit"
        loading={loading}
        setConfirmDelete={setConfirmDelete} 
        confirmDelete={confirmDelete} 
        onDeletePressed={onDeletePressed}
      />
      
      <ScrollView style={styles.container}>
        <CustomFormSection formType="edit" addOrEditAction={handleSubmit(onSavePressed)} loading={loading} key={formKey}>
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

export default EditNoteScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    flex: 1,
  }
});
