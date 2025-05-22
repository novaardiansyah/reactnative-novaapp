import { CustomAppBar, CustomTouchableRipple } from '@/components/CustomPaper';
import { safeRequest, stripHtml, toIndonesianDate } from '@/helpers/UtilsHelper';
import { API_URL, APP_DEBUG } from '@env';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { ActivityIndicator, Appbar, Button, Card, FAB, List, MD2Colors, Searchbar, Text, Tooltip } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types';

interface NoteListScreenProps {}

type NoteListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const NoteListScreen = (props: NoteListScreenProps) => {
  const navigation = useNavigation<NoteListScreenNavigationProp>();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const fetchData = async () => {
    console.log('fetchData()')

    setLoading(true)
    
    const queryParams = searchQuery ? `?search=${searchQuery}` : null;

    const result = await safeRequest({
      url: `${API_URL}/notes/${queryParams || ''}`,
      method: 'get',
    });

    if (result.status !== 200) {
      if (APP_DEBUG) console.error('Error fetching data:', result)
      return setLoading(false)
    }

    setData(result.data?.data || [])
    setLoading(false)
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData()
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    if (searchQuery === '') fetchData()
  }, [searchQuery])

  const onAddPressed = () => {
    navigation.navigate('NoteAdd' as never);
  }

  const onEditPressed = (id: number) => {
    navigation.navigate('NoteEdit', { id });
  }

  return (
    <>
      <CustomAppBar title="Daftar Catatan">
        { showSearch ? (
            <Tooltip title="Tutup pencarian" enterTouchDelay={200}>
              <Appbar.Action icon="close" onPress={() => setShowSearch(false)} size={22} />
            </Tooltip>
          ) : (
            <Tooltip title="Cari data" enterTouchDelay={200}>
              <Appbar.Action icon="magnify" onPress={() => setShowSearch(true)} size={22} />
            </Tooltip>
          )
        }
      </CustomAppBar>

      <ScrollView style={styles.container}>
        { showSearch && (
            <Searchbar
              placeholder="Search"
              onChangeText={setSearchQuery}
              onIconPress={fetchData}
              onSubmitEditing={fetchData}
              value={searchQuery}
              style={{ marginBottom: 10, marginTop: -10, borderRadius: 5, backgroundColor: '#fff' }}
            />
          )
        }

        <View style={{ marginTop: 10 }}></View>

        {loading ? (
           <ActivityIndicator animating color="#6690ff" />
        ) : (
          <>
            {
              !showSearch && (
                <Button icon="plus-circle-outline" mode="contained" style={styles.buttonAdd} buttonColor="#3366ff" onPress={onAddPressed}>
                  Buat
                </Button>
              )
            }
            <Card style={styles.card}>
              {data.map((item, index) => (
                <CustomTouchableRipple key={index} onPress={() => onEditPressed(item.id)}>
                  <List.Item
                    title={() => (
                      <>
                        <Text style={{ fontSize: 12, marginBottom: 5 }}>
                          { toIndonesianDate(item.created_at) }
                        </Text>

                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.title}</Text>
                      </>
                    )}
                    description={stripHtml(item.description)}
                    descriptionStyle={{ fontSize: 11 }}
                    right={props => <List.Icon {...props} icon="chevron-right" style={styles.listItemRight} />}
                    style={{ borderBottomWidth: .5, borderBottomColor: '#ddd' }}
                  />
                </CustomTouchableRipple>
              ))}
            </Card>
          </>
        )}
      </ScrollView>
    </>
  );
};

export default NoteListScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  card: {
    marginBottom: 50,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  listItemRight: {
    marginRight: -10,
    paddingLeft: 10,
    alignSelf: 'center',
  },

  buttonAdd: {
    width: 100, 
    alignSelf: 'flex-end', 
    marginBottom: 10, 
    marginTop: -15
  }
});
