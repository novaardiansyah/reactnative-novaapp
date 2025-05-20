import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Card, List, TouchableRipple } from 'react-native-paper';
import Logo from '@/assets/images/logo-circle.png'
import { useNavigation } from '@react-navigation/native';

interface HomeScreenProps {}

const HomeScreen = (props: HomeScreenProps) => {
  const { user } = useContext(AuthContext)
  const navigation = useNavigation()

  const onNoteListPressed = () => {
    navigation.navigate('NoteList' as never)
  }

  const menus = [
    {
      title: 'Daftar Catatan',
      icon: 'file-document-outline',
      onPress: () => onNoteListPressed(),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Card style={[styles.card, { padding: 15 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar.Image size={50} source={Logo} style={{ backgroundColor: '#6690ff', borderRadius: 50 }} />
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Selamat datang kembali,</Text>
            <Text style={{ fontSize: 14, color: '#666' }}>
              {user?.name}
            </Text>
          </View>
        </View>
      </Card>

      <Card style={styles.card}>
        { menus.map((menu, index) => (
            <TouchableRipple
              key={index}
              onPress={menu.onPress}
              rippleColor="rgba(0, 0, 0, .32)"
              borderless={false}
            >
              <List.Item
                title={menu.title}
                left={props => <List.Icon {...props} icon={menu.icon} />}
                right={props => <List.Icon {...props} icon="chevron-right" />}
                titleStyle={{ fontSize: 14 , marginLeft: -6 }}
              />
            </TouchableRipple>
          ))
        }
      </Card>
    </ScrollView>
  );
};

export default HomeScreen;

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
