import CustomButton from '@/components/CustomButton';
import { AuthContext } from '@/context/AuthContext';
import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';

interface HomeScreenProps {}

const HomeScreen = (props: HomeScreenProps) => {
  const { logout } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  const onSignOutPressed = async() => {
    console.log('onSignOutPressed()')
    setLoading(true)
    await logout()
    setLoading(false)
  };
  
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>

      <CustomButton 
        text={loading ? (<ActivityIndicator color="#fff" />) : 'Sign Out'}
        onPress={onSignOutPressed} 
        disabled={loading}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  }
});
