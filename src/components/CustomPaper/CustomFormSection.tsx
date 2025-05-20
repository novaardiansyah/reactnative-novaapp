import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { ActivityIndicator, Button } from 'react-native-paper'

interface CustomFormSectionProps {
  children?: React.ReactNode,
  formType?: 'add' | 'edit',
  loading?: boolean,
  addOrEditAction?: () => void,
  addOtherAction?: () => void,
  deleteAction?: () => void,
}

const CustomFormSection = (props: CustomFormSectionProps) => {
  const formType = props.formType ? props.formType : 'add'

  return (
    <View style={styles.container}>
      <Text style={styles.textAlert}>
        Pastikan formulir berikut di isi dengan baik dan benar, formulir bertanda (<Text style={{ color: 'red' }}>*</Text>) wajib untuk diisi.
      </Text>

      {props.children}

      <View style={styles.buttonGroups}>
        {
          props.loading ? (
            <Button mode="contained" buttonColor="#6690ff" style={styles.button}>
              <ActivityIndicator color="#fff" size={12} style={{ paddingRight: 5 }} /> Proses...
            </Button>
          ) : (
            <Button mode="contained" buttonColor="#3366ff" style={styles.button} onPress={props.addOrEditAction}>
              {formType === 'add' ? 'Buat' : 'Simpan'}
            </Button>
          )
        }

        { !props.loading && formType === 'add' && (
            <Button mode="outlined" textColor="#3366ff" style={[styles.button, { borderColor: '#3366ff' }]} onPress={props.addOtherAction}>
              Buat & buat lainnya
            </Button>
          )
        }

        { !props.loading && formType === 'edit' && (
            <Button mode="contained" buttonColor="#ff4e30" style={styles.button} onPress={props.deleteAction}>
              Hapus
            </Button>
          )
        }
      </View>
    </View>
  )
}

export default CustomFormSection

const styles = StyleSheet.create({
  container: {},

  textAlert: {
    fontSize: 12, 
    backgroundColor: '#3366ff', 
    color: '#fff', 
    padding: 13, 
    borderRadius: 5, 
    marginBottom: 10
  },

  buttonGroups: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    marginTop: 10,
  },

  button: {
    borderRadius: 10,
  },
})
