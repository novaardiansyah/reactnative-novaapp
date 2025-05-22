import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'

interface CustomAppBarProps {
  children?: React.ReactNode,
  title: string
}

const CustomAppBar = (props: CustomAppBarProps) => {
  let { title, children } = props

  const navigation = useNavigation();

  const onBackPressed = () => {
    navigation.goBack();
  }

  return (
    <Appbar.Header style={{ backgroundColor: '#fff' }}>
      <Appbar.BackAction onPress={onBackPressed} size={22} />
      <Appbar.Content title={title} titleStyle={{ fontSize: 16 }} />
      {children}      
    </Appbar.Header>
  )
}

export default CustomAppBar

const styles = StyleSheet.create({
  container: {}
})
