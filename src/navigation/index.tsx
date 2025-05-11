import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '@/screens/SignInScreen'
import SignUpScreen from '@/screens/SignUpScreen'
import ConfirmSignUpScreen from '@/screens/ConfirmSignUpScreen'
import ResetPasswordScreen from '@/screens/ResetPasswordScreen'
import ConfirmResetPasswordScreen from '@/screens/ConfirmResetPasswordScreen'
import HomeScreen from '@/screens/HomeScreen/HomeScreen'
import { useAuth } from '@/context/AuthContext' // pastikan ini sesuai path kamu

const Stack = createNativeStackNavigator()

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUpScreen} />
    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    <Stack.Screen name="ConfirmResetPassword" component={ConfirmResetPasswordScreen} />
  </Stack.Navigator>
)

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
)

const Navigation = () => {
  const { user } = useAuth()

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default Navigation