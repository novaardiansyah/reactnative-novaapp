import CustomButton from '@/components/CustomButton';
import { AuthContext } from '@/context/AuthContext';
import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Avatar, Card, List, TouchableRipple } from 'react-native-paper';
import Logo from '@/assets/images/logo-circle.png'

interface MeScreenProps {}

const MeScreen = (props: MeScreenProps) => {
  const { logout } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  const onSignOutPressed = async() => {
    console.log('onSignOutPressed()')
    setLoading(true)
    await logout()
    setLoading(false)
  };
  
  return (
    <ScrollView style={styles.container}>
      <Card style={[styles.card, { padding: 15 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar.Image size={50} source={Logo} style={{ backgroundColor: '#6690ff', borderRadius: 50 }} />
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Nova Ardiansyah</Text>
            <Text style={{ fontSize: 14, color: '#666' }}>
              admin@novaardiansyah.my.id
            </Text>
          </View>
        </View>
      </Card>

      <Card style={styles.card}>
        <TouchableRipple
          onPress={() => console.log('Profile Saya')}
          rippleColor="rgba(0, 0, 0, .32)"
          borderless={false}
        >
          <List.Item
            title="Profile Saya"
            left={props => <List.Icon {...props} icon="account-outline" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={{ fontSize: 14 , marginLeft: -6 }}
          />
        </TouchableRipple>  

        <TouchableRipple
          onPress={() => console.log('Profile Saya')}
          rippleColor="rgba(0, 0, 0, .32)"
          borderless={false}
        >
          <List.Item
            title="Keamanan Akun"
            left={props => <List.Icon {...props} icon="shield-check-outline" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={{ fontSize: 14 , marginLeft: -6 }}
          />
        </TouchableRipple>

        <TouchableRipple
          onPress={() => console.log('Profile Saya')}
          rippleColor="rgba(0, 0, 0, .32)"
          borderless={false}
        >
          <List.Item
            title="Pengaturan Umum"
            left={props => <List.Icon {...props} icon="cog" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={{ fontSize: 14 , marginLeft: -6 }}
          />
        </TouchableRipple>
      </Card>

      <CustomButton 
        text={loading ? (<ActivityIndicator color="#fff" />) : 'Sign Out'}
        onPress={onSignOutPressed} 
        disabled={loading}
        variant="secondary"
      />
    </ScrollView>
  );
};

export default MeScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
});
