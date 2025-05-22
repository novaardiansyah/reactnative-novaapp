import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '@/screens/SignInScreen'
import SignUpScreen from '@/screens/SignUpScreen'
import ConfirmSignUpScreen from '@/screens/ConfirmSignUpScreen'
import ResetPasswordScreen from '@/screens/ResetPasswordScreen'
import ConfirmResetPasswordScreen from '@/screens/ConfirmResetPasswordScreen'
import { useAuth } from '@/context/AuthContext' // pastikan ini sesuai path kamu
import CustomButtonNavigation from '@/navigation/CustomButtonNavigation'
import NoteListScreen, { AddNoteScreen } from '@/screens/NoteListScreen'
import { Provider } from 'react-native-paper'
import EditNoteScreen from '@/screens/NoteListScreen/EditNoteScreen'
import { RootStackParamList } from './types'

const Stack = createNativeStackNavigator()

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUpScreen} />
    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    <Stack.Screen name="ConfirmResetPassword" component={ConfirmResetPasswordScreen} />
  </Stack.Navigator>
)

const MainStack = () => (
  <Provider>
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Tabs" component={CustomButtonNavigation} />
        <RootStack.Screen name="NoteList" component={NoteListScreen} />
        <RootStack.Screen name="NoteAdd" component={AddNoteScreen} />
        <RootStack.Screen name="NoteEdit" component={EditNoteScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  </Provider>
)

const Navigation = () => {
  const { user } = useAuth()

  return (
    <>
      {user ? <MainStack /> : (
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      )}
    </>
  )
}

export default Navigation