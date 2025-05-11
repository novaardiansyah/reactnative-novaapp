import * as React from 'react';
import { Text, View, StyleSheet, Image, useWindowDimensions } from 'react-native';
import Logo from '@/assets/images/logo-circle.png'

interface CustomAuthHeaderProps {
  subtitle?: string
}

const CustomAuthHeader = (props: CustomAuthHeaderProps) => {
  const { height } = useWindowDimensions()
  const { subtitle } = props

  return (
    <>
      <Image source={Logo} style={[styles.logo, { height: height * 0.5 }]} resizeMode="contain" /> 

      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Nova Ardiansyah</Text>
      <Text style={{ marginBottom: 20 }}>{subtitle}</Text>
    </>
  );
};

export default CustomAuthHeader;

const styles = StyleSheet.create({
  container: {},

  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 100,
    
    marginBottom: 10,
  },
});
