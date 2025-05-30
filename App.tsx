import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import Navigation from '@/navigation/Navigation'
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
        <StatusBar barStyle="dark-content" backgroundColor="#F9FBFC" />
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
    paddingTop: 5,
  }
})

export default App