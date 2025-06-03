import { CustomAppBar } from '@/components/CustomPaper'
import { safeRequest } from '@/helpers/UtilsHelper'
import { API_URL, APP_DEBUG } from '@env'
import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { StyleSheet, FlatList, TextInput, View, Text } from 'react-native'
import { ActivityIndicator, Appbar, Tooltip } from 'react-native-paper'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types'
import NoteListItem from './atoms/NoteListItem'
import { NoteItemType } from './atoms/types'

interface NoteListScreenProps {}

type NoteListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

const NoteListScreen = (props: NoteListScreenProps) => {
  const navigation = useNavigation<NoteListScreenNavigationProp>()
  const [data, setData] = useState<any[]>([])
  const searchRef = useRef<TextInput>(null)
  const [loading, setLoading] = useState(true)
  const [showSearch, setShowSearch] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const listRef = useRef<FlatList>(null)

  const fetchData = async (searchKeyword?: string) => {
    const method = 'GET'
    let url = `${API_URL}/notes`

    let params = {
      search: searchKeyword || '',
      per_page: '25',
    }

    url += `?${new URLSearchParams(params).toString()}`

    if (APP_DEBUG) console.debug('Fetch', { method, url })

    const result = await safeRequest({ url, method })

    setLoading(false)

    if (result.status !== 200) {
      if (APP_DEBUG) console.error('Error fetching data:', result)
      return
    }

    const { data, next_page_url } = result.data || {}
    setData(data)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData()
    })
    return unsubscribe
  }, [navigation])

  const renderItem = useCallback(({ item }: { item: NoteItemType }) => {
    return <NoteListItem onActionPressed={onEditPressed} item={item} />
  }, [])
  
  const onAddPressed = () => {
    navigation.navigate('NoteAdd')
  }

  const onEditPressed = (id: number) => {
    navigation.navigate('NoteEdit', { id })
  }

  const handleSearch = (value: string) => {
    fetchData(value)
  }

  const closeSearchBar = () => {
    setData([])
    setLoading(true)

    searchRef.current?.clear()
    setShowSearch(false)

    fetchData()
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

      <FlatList 
        data={data}
        ref={listRef}
        style={{ flex: 1, flexGrow: 1 }}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        maxToRenderPerBatch={10}
        initialNumToRender={8}
        renderItem={renderItem}
        onRefresh={() => {
          setRefreshing(true)
          fetchData().finally(() => setRefreshing(false))
        }}
        refreshing={refreshing}
        ListEmptyComponent={() => (
          loading ? (
            <ActivityIndicator size={25} color="#3366FF" style={{ marginTop: 20 }} />
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>Tidak ada data</Text>
          )
        )}
      />
    </View>
  )
}

export default NoteListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  searchBar: {
    height: 40, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderRadius: 5, 
    paddingHorizontal: 10 
  }
})
