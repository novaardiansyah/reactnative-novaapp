import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

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
