import { CustomListHeader } from '@/components/CustomListHeader'
import React, { useRef, useState } from 'react'
import { Text, StyleSheet, ScrollView, TextInput } from 'react-native'

interface PaymentAccountScreenProps {}

const PaymentAccountScreen = (props: PaymentAccountScreenProps) => {
  const [showSearch, setShowSearch] = useState(false)
  const searchRef = useRef<TextInput>(null) as React.RefObject<TextInput>

  const closeSearchBar = async () => {
    console.debug('Closing search bar')
    setShowSearch(false)
  }

  const handleSearch = async (value: string) => {
    console.debug('Search:', value)
  }

  const onAddPressed = async () => {
    console.debug('Add button pressed')
  }

  return (
    <>
      <CustomListHeader 
        title="Daftar Akun Kas"
        onAddPressed={onAddPressed} 
        handleSearch={handleSearch} 
        closeSearchBar={closeSearchBar} 
        setShowSearch={setShowSearch} 
        showSearch={showSearch} 
        searchRef={searchRef} 
      />

      <ScrollView style={styles.container}>
        <Text>PaymentAccountScreen</Text>
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
})
