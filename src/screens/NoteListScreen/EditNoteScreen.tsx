import { CustomAppBar, CustomFormSection, CustomTextInput } from '@/components/CustomPaper'
import { safeRequest, stripHtml } from '@/helpers/UtilsHelper'
import { API_URL, APP_DEBUG } from '@env'
import { useNavigation } from '@react-navigation/native'
import React, { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import Toast from 'react-native-toast-message'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '@/navigation/types'
import { Appbar, Tooltip } from 'react-native-paper'

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
      if (APP_DEBUG) console.error('Error fetching data:', result)
      
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

    navigation.goBack()

    Toast.show({
      type: 'success',
      text1: result?.data?.message || 'Catatan berhasil diperbarui',
    })
    
    return true
  }

  const onDeletePressed = async (id: number) => {
    setLoading(true)

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
      <CustomAppBar title="Edit Daftar Catatan">
        {
          loading ? (
            <ActivityIndicator size={22} animating color="#6690ff" style={{ alignSelf: 'center', marginRight: 12 }} />
          ) : (
            <Tooltip title="Hapus data" enterTouchDelay={200}>
              <Appbar.Action icon="trash-can-outline" iconColor="#ff4e30" onPress={() => onDeletePressed(data.id)} size={22} />
            </Tooltip>
          )
        }
      </CustomAppBar>
      
      <ScrollView style={styles.container}>
        <CustomFormSection formType="edit" addOrEditAction={handleSubmit(onSavePressed)} loading={loading} key={formKey}>
          <CustomTextInput 
            name="title"
            label="Judul Catatan" 
            markRequired
            rows={1}
            control={control}
            // defaultValue={data.title}
          />

          <CustomTextInput 
            name="description"
            label="Keterangan" 
            markRequired
            rows={2}
            maxRows={10}
            control={control}
            // defaultValue={stripHtml(data.description)}
          />
        </CustomFormSection>
      </ScrollView>
    </>
  );
};

export default EditNoteScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  }
});
