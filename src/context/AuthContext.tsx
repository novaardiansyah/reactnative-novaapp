import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, APP_DEBUG } from '@env';
import { removeKeychain, safeRequest, saveKeychain } from '@/helpers/UtilsHelper';

type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  token: string;
  token_expires_at: string;
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

    const userData = await safeRequest({
      url: `${API_URL}/auth/me`,
      method: 'get',
    })

    const auth = { ...userData.data, token: access_token, token_expires_at: expires_at }
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

    await AsyncStorage.multiRemove(['user', 'access_token', 'confirmSignUp'])
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
    loadUser();

    if (user) {
      // ! '12/5/2025 16.32.50'
      let token_expires_at = new Date(user.token_expires_at).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
      let now = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
      
      const hasExpired = token_expires_at < now
      
      // Todo: logout if expired (create custom page and tell user that their session has expired)
      if (hasExpired) logout()
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)