import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import Logo from '@/assets/images/logo-circle.png'
import { useNavigation } from '@react-navigation/native';
import { CustomCard, CustomTouchableRipple } from '@/components/CustomPaper';
import { RootStackParamList } from '@/navigation/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface HomeScreenProps {}

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

const HomeScreen = (props: HomeScreenProps) => {
  const { user } = useContext(AuthContext)
  const navigation = useNavigation<HomeScreenNavigationProp>()

  const menus = [
    {
      title: 'Daftar Catatan',
      icon: 'file-document-outline',
      onPress: () => navigation.navigate('NoteList'),
    },
    {
      title: 'Akun Kas',
      icon: 'cash-multiple',
      onPress: () => navigation.navigate('PaymentAccount'),
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <CustomCard style={{ padding: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar.Image size={50} source={Logo} style={{ backgroundColor: '#6690ff', borderRadius: 50 }} />
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Selamat datang kembali,</Text>
            <Text style={{ fontSize: 14, color: '#666' }}>
              {user?.name}
            </Text>
          </View>
        </View>
      </CustomCard>

      <CustomCard>
        { menus.map((menu, index) => (
            <CustomTouchableRipple
              key={index}
              onPress={menu.onPress}
            >
              <List.Item
                title={menu.title}
                left={props => <List.Icon {...props} icon={menu.icon} />}
                right={props => <List.Icon {...props} icon="chevron-right" style={styles.listItemRight} />}
                titleStyle={{ fontSize: 14 , marginLeft: -6 }}
              />
            </CustomTouchableRipple>
          ))
        }
      </CustomCard>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  listItemRight: {
    marginRight: -10,
    paddingLeft: 10,
    alignSelf: 'center',
  },
});
