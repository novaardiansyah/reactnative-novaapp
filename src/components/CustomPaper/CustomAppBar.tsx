import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleProp, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper'

interface CustomAppBarProps {
  children?: React.ReactNode,
  title: string
  style?: StyleProp<any>
}

const CustomAppBar = (props: CustomAppBarProps) => {
  let { title, children } = props

  const navigation = useNavigation();

  const onBackPressed = () => {
    navigation.goBack();
  }

  return (
    <Appbar.Header style={[styles.container, props.style]}>
      <Appbar.BackAction onPress={onBackPressed} size={22} />
      <Appbar.Content title={title} titleStyle={{ fontSize: 16 }} />
      {children}      
    </Appbar.Header>
  )
}

export default CustomAppBar

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5, 
    borderBottomColor: '#ddd',
    backgroundColor: '#fff'
  }
})
