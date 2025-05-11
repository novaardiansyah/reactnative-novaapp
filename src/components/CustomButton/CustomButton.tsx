import React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle, Pressable } from 'react-native'

type CustomButtonProps = {
  style?: StyleProp<ViewStyle>
  onPress?: () => void
  text: any
  variant?: 'primary' | 'tertiary' | 'secondary'
  disabled?: boolean
}

const CustomButton = ({ style, onPress, text, variant = 'primary', disabled }: CustomButtonProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, style, styles[`container_${variant}`]]} disabled={disabled}>
      <Text style={[styles.text, styles[`text_${variant}`]]}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },

  container_primary: {
    backgroundColor: '#3366FF',
  },

  container_tertiary: {
    
  },

  container_secondary: {
    borderColor: '#3366FF',
    borderWidth: 2,
  },

  text: {
    fontWeight: 'bold',
  },

  text_primary: {
    color: '#fff',
  },

  text_tertiary: {
    color: '#3366FF',
  },

  text_secondary: {
    color: '#3366FF',
  },
})

export default CustomButton
