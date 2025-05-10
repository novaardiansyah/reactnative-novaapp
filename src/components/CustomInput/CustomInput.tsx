import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

type CustomInputProps = {
  value: string
  setValue: (value: string) => void
  placeholder: string
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'numeric'
}

const CustomInput = ({ value, setValue, placeholder, secureTextEntry = false, keyboardType = 'default' }: CustomInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput 
        placeholder={placeholder}
        style={styles.input} 
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },

  input: {

  }
})  

export default CustomInput
