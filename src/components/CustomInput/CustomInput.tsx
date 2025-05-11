import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { StyleSheet, Text, TextInput, View } from 'react-native'

type CustomInputProps = {
  control: Control<any>
  name: string
  placeholder: string
  rules?: object
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'numeric'
}
const CustomInput = ({ control, name, placeholder, rules, secureTextEntry = false, keyboardType = 'default' }: CustomInputProps) => {
  return (
    <Controller 
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <>
          <View style={[styles.container, { borderColor: error ? '#FF4F30' : value ? '#5cc932' : '#e8e8e8' }]}>
            <TextInput 
              placeholder={placeholder}
              style={[styles.input]} 
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
            />
          </View>
          {error && error.message && <Text style={styles.error}>{error.message}</Text>}
        </>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',

    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },

  input: {

  },

  error: {
    color: '#FF4F30',
    alignSelf: 'stretch',
    paddingBottom: 10,
  }
})  

export default CustomInput
