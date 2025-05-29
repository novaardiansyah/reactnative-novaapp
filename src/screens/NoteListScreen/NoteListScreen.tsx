import { CustomAppBar, CustomCard, CustomTouchableRipple } from '@/components/CustomPaper';
import { safeRequest, stripHtml, toIndonesianDate } from '@/helpers/UtilsHelper';
import { API_URL, APP_DEBUG } from '@env';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, useWindowDimensions } from 'react-native';
import { ActivityIndicator, Appbar, List, Searchbar, Text, Tooltip } from 'react-native-paper';
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
  const { height } = useWindowDimensions();

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

  const onAddPressed = () => {
    navigation.navigate('NoteAdd' as never);
  }

  const onEditPressed = (id: number) => {
    navigation.navigate('NoteEdit', { id });
  }

  return (
    <View style={{ flex: 1 }}>
      <CustomAppBar title="Daftar Catatan">
        <Appbar.Action icon="plus-circle-outline" onPress={onAddPressed} size={22} />
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

      { showSearch && (
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            onIconPress={fetchData}
            onSubmitEditing={fetchData}
            value={searchQuery}
            style={styles.searchBar}
          />
        )
      }

      {
        loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ marginBottom: 10 }}>Memuat data...</Text>
            <ActivityIndicator animating color="#6690ff" />
          </View>
        ) : (
          <CustomCard>
            <FlatList 
              data={data}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator
              keyboardShouldPersistTaps="handled"
              removeClippedSubviews={false}
              // style={{ height: height - 60 }}
              renderItem={({ item }) => (
                <CustomTouchableRipple onPress={() => onEditPressed(item.id)}>
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
              )}
            />
          </CustomCard>
        )
      }
    </View>
  );
};

export default NoteListScreen;

const styles = StyleSheet.create({
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
  },

  searchBar: {
    marginBottom: 0, 
    marginTop: -10, 
    borderRadius: 5, 
    backgroundColor: '#fff'
  }
});
