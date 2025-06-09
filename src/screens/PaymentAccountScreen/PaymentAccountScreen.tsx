import { CustomListHeader } from '@/components/CustomListHeader'
import { logger, safeRequest } from '@/helpers/UtilsHelper'
import { API_URL } from '@env'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, ScrollView, TextInput, View, RefreshControl } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import PaymentAccountItem from './atoms/PaymentAccountItem'
import { RootStackParamList } from '@/navigation/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'

interface PaymentAccountScreenProps {}

interface PaymentAccountData {
  id: number
  name: string
  deposit: number
  logo: string
  created_at: Date
  updated_at: Date
}

type PaymentAccountScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PaymentAccount'>

const PaymentAccountScreen = (props: PaymentAccountScreenProps) => {
  const navigation = useNavigation<PaymentAccountScreenNavigationProp>()
  const [showSearch, setShowSearch] = useState(false)
  const searchRef = useRef<TextInput>(null) as React.RefObject<TextInput>
  const [data, setData] = useState<PaymentAccountData[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = useCallback(async () => {
    const method = 'GET'
    let url = `${API_URL}/payment-accounts`
    const result = await safeRequest({ url, method })

    if (result.status !== 200) {
      logger('Error fetching payment accounts', { status: result.status, data: result.data })
      return
    }

    const { data } = result.data || {}
    logger('Fetched payment accounts', { data })  

    setData(data || [])
  }, [])

  useEffect(() => {
    fetchData().finally(() => setLoading(false))
  }, [fetchData])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetchData().finally(() => setRefreshing(false))
  }, [fetchData])

  const closeSearchBar = async () => {
    console.debug('Closing search bar')
    setShowSearch(false)
  }

  const handleSearch = async (value: string) => {
    console.debug('Search:', value)
  }

  const handleOnPress = (id: number) => {
    navigation.navigate('EditPaymentAccount', { id })
  }

  return (
    <>
      <CustomListHeader 
        title="Daftar Akun Kas"
        handleSearch={handleSearch} 
        closeSearchBar={closeSearchBar} 
        setShowSearch={setShowSearch} 
        showSearch={showSearch} 
        searchRef={searchRef} 
      />

      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3366FF']}
            tintColor="#3366FF"
          />
        }
      >
        { loading && (
            <View style={styles.loading}>
              <ActivityIndicator color="#3366FF" />
              <Text style={styles.loadingText}>Memuat data...</Text>
            </View>
          )
        }

        {
          data.length === 0 && !loading && (
            <View style={styles.loading}>
              <Text style={styles.loadingText}>Tidak ada akun kas yang ditemukan.</Text>
            </View>
          )
        }

        { data.length > 0 && (
            data.map((item) => (
              <PaymentAccountItem 
                key={item.id}
                item={item}
                refreshing={refreshing}
                handleOnPress={() => handleOnPress(item.id)}
              />
            ))
          )
        }
      </ScrollView>
    </>
  )
}

export default PaymentAccountScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 15,
  },
  loadingText: {
    marginTop: 10, 
  },
})
