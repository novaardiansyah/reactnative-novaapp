import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Navigation from '@/navigation'
import { AuthProvider } from '@/context/AuthContext'
import Toast from 'react-native-toast-message'
import { DefaultTheme, PaperProvider } from 'react-native-paper'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3366ff',
    secondary: '#909098',
  },
};

const App = () => {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.root}>
          <Navigation />
        </SafeAreaView>
        <Toast position="top" topOffset={20} swipeable visibilityTime={3000} />
      </PaperProvider>
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