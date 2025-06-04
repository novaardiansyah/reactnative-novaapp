import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as Keychain from 'react-native-keychain';

type ApiResponse<T = any> = {
  status: number | undefined;
  data: T;
};

export async function safeRequest<T = any>(
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const token = await AsyncStorage.getItem('access_token');

    const authHeaders = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    const mergedConfig = {
      ...config,
      headers: {
        ...authHeaders,
        ...config.headers,
      },
    };

    const res: AxiosResponse<T> = await axios(mergedConfig);
    return { status: res.status, data: res.data };
  } catch (err: any) {
    const errorData = err?.response?.data || { message: 'Something went wrong' };
    const statusCode = err?.response?.status;
    return { status: statusCode, data: errorData };
  }
}

export interface ToIndonesianDateOptions extends Intl.DateTimeFormatOptions {}

export async function toIndonesianDate(dateString: string, format?: ToIndonesianDateOptions): Promise<string> {
  return new Date(dateString).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...format,
  } as ToIndonesianDateOptions);
}

export function stripHtml(html: string): string {
  return html ? html.replace(/<[^>]+>/g, '') : '';
}

export async function saveKeychain(key: string, value: string): Promise<boolean> {
  try {
    await Keychain.setGenericPassword(key, value, { service: key });
    return true;
  } catch (error) {
    console.error('Error saving key chain:', error);
    return false;
  }
}

export async function getKeychain(key: string): Promise<string | null> {
  try {
    const credentials = await Keychain.getGenericPassword({ service: key });
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.error('Error getting key chain:', error);
    return null;
  }
};

export async function removeKeychain(key: string): Promise<boolean> {
  try {
    await Keychain.resetGenericPassword({ service: key });
    return true;
  } catch (error) {
    console.error('Error removing keychain:', error);
    return false;
  }
};