import { CustomAppBar, CustomTouchableRipple } from '@/components/CustomPaper';
import { safeRequest, stripHtml, toIndonesianDate } from '@/helpers/UtilsHelper';
import { API_URL, APP_DEBUG } from '@env';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, FlatList, TextInput, View } from 'react-native';
import { ActivityIndicator, Appbar, Text, Tooltip } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types';
import NoteListItem from './atoms/NoteListItem';

interface NoteListScreenProps {}

type NoteListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const NoteListScreen = (props: NoteListScreenProps) => {
  const navigation = useNavigation<NoteListScreenNavigationProp>();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<TextInput>(null);

  const fetchData = async (searchKeyword?: string) => {
    console.log('fetchData()')

    setLoading(true)
    
    const queryParams = searchKeyword ? `&search=${searchKeyword}` : null;

    const result = await safeRequest({
      url: `${API_URL}/notes/?per_page=10${queryParams || ''}`,
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

  const handleSearch = (value: string) => {
    fetchData(value);
  };

  const closeSearchBar = () => {
    setShowSearch(false);
    searchRef.current?.clear();
    fetchData();
  }

  return (
    <View style={styles.container}>
      <CustomAppBar title="Daftar Catatan">
        <Appbar.Action icon="plus-circle-outline" onPress={onAddPressed} size={22} />
        { showSearch ? (
            <Tooltip title="Tutup pencarian" enterTouchDelay={200}>
              <Appbar.Action icon="close" onPress={closeSearchBar} size={22} />
            </Tooltip>
          ) : (
            <Tooltip title="Cari data" enterTouchDelay={200}>
              <Appbar.Action icon="magnify" onPress={() => setShowSearch(true)} size={22} />
            </Tooltip>
          )
        }
      </CustomAppBar>

      { showSearch && (
          <View style={{ padding: 10, backgroundColor: '#fff' }}>
            <TextInput
              placeholder="Ketik untuk mencari..."
              autoFocus
              onSubmitEditing={(event) => handleSearch(event.nativeEvent.text)}
              ref={searchRef}
              style={styles.searchBar}
            />
          </View>
        )
      }

      {
        loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ marginBottom: 10 }}>Memuat data...</Text>
            <ActivityIndicator animating color="#6690ff" />
          </View>
        ) : (
          <FlatList 
            data={data}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps="handled"
            style={{ flex: 1 }}
            renderItem={({ index, item }) => (
              <NoteListItem onActionPressed={onEditPressed} item={item} index={index + 1} />
            )}
          />
        )
      }
    </View>
  );
};

export default NoteListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },

  searchBar: {
    height: 40, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderRadius: 5, 
    paddingHorizontal: 10 
  }
});
