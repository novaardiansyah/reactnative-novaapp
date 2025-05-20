import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import { Control, Controller } from 'react-hook-form'

interface CustomTextInputProps {
  name: string
  label: string
  markRequired?: boolean
  rows?: number
  maxRows?: number
  control: Control<any>
  rules?: object
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'numeric'
}

const CustomTextInput = (props: CustomTextInputProps) => {
  const oneRowHeight = 40
  const minHeight    = props.rows && props.rows > 1 ? oneRowHeight * props.rows : 58

  let maxRows = props.maxRows ? props.maxRows : props.rows
  const maxHeight = maxRows ? oneRowHeight * maxRows : 58
  
  return (
    <Controller 
      control={props.control}
      name={props.name}
      rules={props.rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <>
          <TextInput
            label={(<>{props.label}{props.markRequired ? <Text style={{ color: 'red' }}>*</Text> : ''}</>)}
            mode="outlined"
            style={[styles.input, { minHeight, maxHeight }]}
            activeOutlineColor={error ? '#FF4F30' : '#3366ff'}
            outlineColor={error ? '#FF4F30' : '#e8e8e8'}
            multiline={props.rows ? true : false}
            value={value || ''}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.keyboardType}
          />
          {error && error.message && <Text style={styles.error}>{error.message}</Text>}
        </>
      )}
    />
  )
}

export default CustomTextInput

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },

  error: {
    color: '#FF4F30',
    alignSelf: 'stretch',
    paddingBottom: 10,
    marginTop: -5,
  }
})
