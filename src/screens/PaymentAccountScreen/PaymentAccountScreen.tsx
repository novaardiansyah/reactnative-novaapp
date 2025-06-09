import { CustomListHeader } from '@/components/CustomListHeader'
import { CustomTouchableRipple } from '@/components/CustomPaper'
import { logger, safeRequest, toIndonesianDate } from '@/helpers/UtilsHelper'
import { ADMIN_URL, API_URL } from '@env'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, ScrollView, TextInput, View } from 'react-native'
import { ActivityIndicator, Avatar, List, Text } from 'react-native-paper'
import PaymentAccountItem from './atoms/PaymentAccountItem'

interface PaymentAccountScreenProps {}

interface PaymentAccountData {
  id: number
  name: string
  deposit: number
  logo: string
  created_at: Date
  updated_at: Date
}

const PaymentAccountScreen = (props: PaymentAccountScreenProps) => {
  const [showSearch, setShowSearch] = useState(false)
  const searchRef = useRef<TextInput>(null) as React.RefObject<TextInput>
  const [data, setData] = useState<PaymentAccountData[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
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
  }

  useEffect(() => {
    fetchData().finally(() => setLoading(false))
  }, [])

  const closeSearchBar = async () => {
    console.debug('Closing search bar')
    setShowSearch(false)
  }

  const handleSearch = async (value: string) => {
    console.debug('Search:', value)
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

      <ScrollView style={styles.container}>
        { loading && (
            <View style={styles.loading}>
              <ActivityIndicator color="#3366FF" />
              <Text style={styles.loadingText}>Memuat data...</Text>
            </View>
          )
        }

        { data.length > 0 ? (
            data.map((item) => (
              <PaymentAccountItem 
                key={item.id}
                item={item}
              />
            ))
          ) : (
            <View style={styles.loading}>
              <Text style={styles.loadingText}>Tidak ada akun kas yang ditemukan.</Text>
            </View>
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
