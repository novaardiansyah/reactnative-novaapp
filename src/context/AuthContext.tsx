import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, APP_DEBUG } from '@env';
import axios from 'axios';

export const AuthContext = createContext({
  user: null,
  login: async (data: object): Promise<any> => {},
  logout: async (): Promise<any> => {},
});

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [user, setUser] = useState<any>(null);

  const login = async (data: object) => {
    if (APP_DEBUG) console.log('login()')
    
    try {
      const res = await axios.post(`${API_URL}/auth/login`, data);

      const { access_token, expires_at } = res.data;

      const userData = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })

      const auth = { ...userData.data, token: access_token, token_expires_at: expires_at };

      setUser(auth)

      await AsyncStorage.multiSet([
        ['user', JSON.stringify(auth)],
        ['access_token', access_token],
      ])

      return { status: res.status, data: auth };
    } catch (err: any) {
      let error = err?.response?.data || { message: 'Something went wrong' };
      return { status: err?.response?.status, data: error };
    }
  };

  const logout = async () => {
    if (APP_DEBUG) console.log('logout()')
    
    try {
      const res = await axios.post(`${API_URL}/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setUser(null);

      await AsyncStorage.multiRemove(['user', 'access_token', 'confirmSignUp'])

      return { status: res.status, data: res.data };
    } catch (err: any) {
      let error = err?.response?.data || { message: 'Something went wrong' };
      return { status: err?.response?.status, data: error };
    }
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