import CustomButton from '@/components/CustomButton';
import { AuthContext } from '@/context/AuthContext';
import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Avatar, Card, List } from 'react-native-paper';
import Logo from '@/assets/images/logo-circle.png'
import { CustomTouchableRipple } from '@/components/CustomPaper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { useNavigation } from '@react-navigation/native';

interface MeScreenProps {}

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const MeScreen = (props: MeScreenProps) => {
  const { logout, user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<NavigationProps>();

  const onSignOutPressed = async() => {
    console.log('onSignOutPressed()')
    setLoading(true)
    await logout()
    setLoading(false)
  };

  const censoredEmail = (email: string) => {
    const [username, domain] = email.split('@');
    if (username.length <= 2) return email;

    const visible          = username.length <= 4 ? 1 : 2;
    const censoredLength   = username.length - visible * 2;
    const censored         = '*'.repeat(Math.max(0, censoredLength));
    const censoredUsername = username.slice(0, visible) + censored + username.slice(-visible);

    return `${censoredUsername}@${domain}`;
  }

  const onGeneralSettingsPressed = () => {
    navigation.navigate('GeneralSetting')
  }
  
  return (
    <ScrollView style={styles.container}>
      {
        user ? (
          <>
            <Card style={[styles.card, { padding: 15 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Avatar.Image size={50} source={Logo} style={{ backgroundColor: '#6690ff', borderRadius: 50 }} />
                <View style={{ marginLeft: 12 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{user.name}</Text>
                  <Text style={{ fontSize: 14, color: '#666' }}>
                    {censoredEmail(user.email)}
                  </Text>
                </View>
              </View>
            </Card>

            <Card style={styles.card}>
              <CustomTouchableRipple onPress={() => console.log('Profile Saya')}>
                <List.Item
                  title="Profile Saya"
                  left={props => <List.Icon {...props} icon="account-outline" />}
                  right={props => <List.Icon {...props} icon="chevron-right" style={styles.listItemRight} />}
                  titleStyle={{ fontSize: 14 , marginLeft: -6 }}
                />
              </CustomTouchableRipple>  

              <CustomTouchableRipple onPress={() => console.log('Profile Saya')}>
                <List.Item
                  title="Keamanan Akun"
                  left={props => <List.Icon {...props} icon="shield-check-outline" />}
                  right={props => <List.Icon {...props} icon="chevron-right" style={styles.listItemRight} />}
                  titleStyle={{ fontSize: 14 , marginLeft: -6 }}
                />
              </CustomTouchableRipple>

              <CustomTouchableRipple onPress={onGeneralSettingsPressed}>
                <List.Item
                  title="Pengaturan Umum"
                  left={props => <List.Icon {...props} icon="cog" />}
                  right={props => <List.Icon {...props} icon="chevron-right" style={styles.listItemRight} />}
                  titleStyle={{ fontSize: 14 , marginLeft: -6 }}
                />
              </CustomTouchableRipple>
            </Card>

            <CustomButton 
              text={loading ? (<ActivityIndicator color="#3366FF" />) : 'Logout Akun'}
              onPress={onSignOutPressed} 
              disabled={loading}
              variant="secondary"
            />
          </>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#666' }}>Please log in to see your profile</Text>
          </View>
        )
      }
    </ScrollView>
  );
};

export default MeScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  listItemRight: {
    marginRight: -10,
    paddingLeft: 10,
    alignSelf: 'center',
  },
});
