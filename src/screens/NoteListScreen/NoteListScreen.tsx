import { logger, safeRequest } from '@/helpers/UtilsHelper'
import { API_URL, APP_DEBUG } from '@env'
import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { StyleSheet, FlatList, TextInput, View, Text } from 'react-native'
import { ActivityIndicator, Appbar, Tooltip } from 'react-native-paper'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types'
import NoteListItem from './atoms/NoteListItem'
import { NoteItemType } from './atoms/types'
import { CustomListHeader } from '@/components/CustomListHeader'

interface NoteListScreenProps {}

type NoteListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

const NoteListScreen = (props: NoteListScreenProps) => {
  const navigation = useNavigation<NoteListScreenNavigationProp>()
  const [data, setData] = useState<any[]>([])
  const searchRef = useRef<TextInput>(null) as React.RefObject<TextInput>
  const [loading, setLoading] = useState(true)
  const [showSearch, setShowSearch] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const listRef = useRef<FlatList>(null)
  const [nextPage, setNextPage] = useState<number | null>(null)
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false)

  const fetchData = async (searchKeyword?: string) => {
    const method = 'GET'
    let url = `${API_URL}/notes`

    let params = {
      search: searchKeyword || '',
      per_page: '25',
      page: nextPage ? nextPage.toString() : '1',
    }

    url += `?${new URLSearchParams(params).toString()}`

    logger('Fetch Notes', { method, url })

    const result = await safeRequest({ url, method })

    if (result.status !== 200) {
      if (APP_DEBUG) console.debug('Error fetching data:', result)
      return setLoading(false)
    }

    const { data, next_page, current_page } = result.data || {}
    setNextPage(next_page || null)

    logger('Fetched Notes', { data, next_page, current_page })

    setData((prevData) => {
      if (nextPage && nextPage > 1) {
        if (APP_DEBUG) console.debug('Appending data to existing list')
        return [...prevData, ...data]
      }
      if (APP_DEBUG) console.debug('Setting new data list')
      return data || []
    })

    setLoading(false)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setNextPage(null)
      setData([])
      fetchData()
    })
    return unsubscribe
  }, [navigation])

  const handleNextPage = () => {
    if (isLoadingNextPage || !nextPage) return

    setIsLoadingNextPage(true)
    fetchData().finally(() => setIsLoadingNextPage(false))
  }

  const onEditPressed = (id: number) => {
    navigation.navigate('NoteEdit', { id })
  }

  const renderItem = useCallback(
    ({ item }: { item: NoteItemType }) => (
      <NoteListItem onActionPressed={onEditPressed} item={item} />
    ),
    [onEditPressed]
  )
  
  const onAddPressed = () => {
    navigation.navigate('NoteAdd')
  }

  const handleSearch = (value: string) => {
    setData([])
    setLoading(true)
    setNextPage(null)
    fetchData(value)
  }

  const closeSearchBar = () => {
    setData([])
    setLoading(true)
    setNextPage(null)

    searchRef.current?.clear()
    setShowSearch(false)

    fetchData()
  }

  return (
    <View style={styles.container}>
      <CustomListHeader 
        title="Daftar Catatan"
        hasAddButton={true}
        onAddPressed={onAddPressed}
        handleSearch={handleSearch} 
        closeSearchBar={closeSearchBar} 
        setShowSearch={setShowSearch} 
        showSearch={showSearch} 
        searchRef={searchRef} 
      />

      <FlatList 
        data={data}
        ref={listRef}
        style={{ flex: 1, flexGrow: 1 }}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={7}
        renderItem={renderItem}
        onRefresh={() => {
          setRefreshing(true)
          fetchData().finally(() => setRefreshing(false))
        }}
        refreshing={refreshing}
        onEndReachedThreshold={0.5}
        onEndReached={handleNextPage}
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
})
