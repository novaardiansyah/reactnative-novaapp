import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Navigation from '@/navigation'
import { AuthProvider } from '@/context/AuthContext'
import Toast from 'react-native-toast-message'

const App = () => {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.root}>
        <Navigation />
      </SafeAreaView>
      <Toast position="top" topOffset={20} swipeable visibilityTime={3000} />
    </AuthProvider>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  }
})

export default App