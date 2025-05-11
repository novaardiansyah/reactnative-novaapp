import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import axios from 'axios';

export const AuthContext = createContext({
  user: null,
  login: async (data: object): Promise<any> => {},
  logout: async (): Promise<any> => {},
});

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [user, setUser] = useState<any>(null);

  const login = async (data: object) => {
    console.log('login()')
    
    try {
      const res = await axios.post(`${API_URL}/auth/login`, data);

      const { access_token } = res.data;

      const userData = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })

      const auth = {...userData.data, token: access_token}

      setUser(auth)
      await AsyncStorage.setItem('user', JSON.stringify(auth))

      return { status: res.status, data: auth };
    } catch (err: any) {
      let error = err?.response?.data || { message: 'Something went wrong' };
      return { status: err?.response?.status, data: error };
    }
  };

  const logout = async () => {
    console.log('logout()')
    
    try {
      const res = await axios.post(`${API_URL}/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setUser(null);
      await AsyncStorage.removeItem('user');

      return { status: res.status, data: res.data };
    } catch (err: any) {
      let error = err?.response?.data || { message: 'Something went wrong' };
      return { status: err?.response?.status, data: error };
    }
  };

  const loadUser = async () => {
    const savedUser = await AsyncStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    return savedUser;
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)