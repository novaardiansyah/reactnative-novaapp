import { CustomListHeader } from '@/components/CustomListHeader'
import { CustomTouchableRipple } from '@/components/CustomPaper'
import { logger, safeRequest, toIndonesianDate } from '@/helpers/UtilsHelper'
import { ADMIN_URL, API_URL } from '@env'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, ScrollView, TextInput, View } from 'react-native'
import { ActivityIndicator, Avatar, List, Text } from 'react-native-paper'

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
              <Text>Memuat data...</Text>
            </View>
          )
        }

        {
          data.map((item) => (
            <CustomTouchableRipple onPress={() => {}} key={item.id}>
              <List.Item
                title={item.name}
                description={`${toIndonesianDate(item.updated_at, { weekday: 'short' })}`}
                descriptionStyle={{ fontSize: 12 }}
                left={props => (
                  <Avatar.Image 
                    {...props} 
                    source={{ uri: `${ADMIN_URL}/storage/${item.logo}` }} 
                    style={styles.listImage}
                    size={40} 
                  />
                )}
                right={props => (
                  <View style={styles.listItemRight} {...props}>
                    <Text style={styles.depositText}>
                      {`Rp${item.deposit.toLocaleString('id-ID')}`}
                    </Text>
                  </View>
                )}
                titleStyle={styles.title}
              />
            </CustomTouchableRipple>
          ))
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
    marginBottom: 10
  },
  title: {
    fontSize: 14, 
    fontWeight: 'bold',
  },
  listItemRight: {
    marginRight: -5,
    paddingLeft: 10,
    alignSelf: 'center',
  },
  listImage: {
    backgroundColor: 'transparent', 
    marginLeft: 16
  },
  depositText: {
    fontWeight: 'bold', 
    fontSize: 14,
    letterSpacing: 0.5,
    textAlign: 'right',
    color: '#0F6F3E',
  },
})
