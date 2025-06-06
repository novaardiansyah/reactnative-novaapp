import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, APP_DEBUG } from '@env';
import { removeKeychain, safeRequest, saveKeychain } from '@/helpers/UtilsHelper';
import { setLogoutCallback } from '@/helpers/AuthEvent';

type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
};

export const AuthContext = createContext({
  user: null as User | null,
  login: async (data: object): Promise<any> => {},
  logout: async (): Promise<any> => {},
});

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [user, setUser] = useState<any>(null);

  const login = async (data: object) => {
    if (APP_DEBUG) console.log('login()')

    const result = await safeRequest({
      url: `${API_URL}/auth/login`,
      method: 'post',
      data,
    })

    if (result?.status !== 200) {
      let error = result?.data || { message: 'Something went wrong' }
      return { status: result?.status, data: error }
    }

    const { access_token, refresh_token, expires_at } = result.data

    await AsyncStorage.setItem('access_token', access_token)
    await AsyncStorage.setItem('access_token_expires_at', expires_at)

    const userData = await safeRequest({
      url: `${API_URL}/auth/me`,
      method: 'get',
    })

    const auth = userData.data as User;
    setUser(auth)

    await saveKeychain('refresh_token', refresh_token)
    await AsyncStorage.setItem('user', JSON.stringify(auth))

    return { status: result.status, data: auth }
  };

  const logout = async () => {
    if (APP_DEBUG) console.log('logout()')
    
    const result = await safeRequest({
      url: `${API_URL}/auth/logout`,
      method: 'post',
    })

    setUser(null)

    await AsyncStorage.multiRemove(['user', 'access_token', 'access_token_expires_at', 'confirmSignUp'])
    await removeKeychain('refresh_token')

    return { status: result.status, data: result.data }
  };

  const loadUser = async () => {
    if (APP_DEBUG) console.log('loadUser()')

    const savedUser = await AsyncStorage.getItem('user');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    return savedUser;
  };

  useEffect(() => {
    loadUser()
  }, []);

  useEffect(() => {
    setLogoutCallback(logout)
  }, [logout])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)