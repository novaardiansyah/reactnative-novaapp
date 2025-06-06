import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import * as Keychain from 'react-native-keychain'
import { API_URL } from '@env'
import { triggerLogout } from './AuthEvent'

type ApiResponse<T = any> = {
  status: number | undefined
  data: T
}

async function refreshToken(): Promise<boolean> {
  interface RefreshTokenResponse {
    access_token: string
    expires_at: string
  }

  try {
    const access_token = await AsyncStorage.getItem('access_token')
    const refresh_token = await getKeychain('refresh_token')

    if (!refresh_token || !access_token) return false

    const res = await axios.post(`${API_URL}/auth/refresh-token`, { refresh_token }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (res.status === 200 && res.data?.access_token) {
      const data: RefreshTokenResponse = res.data

      await AsyncStorage.setItem('access_token', data.access_token)
      await AsyncStorage.setItem('access_token_expires_at', data.expires_at)

      return true
    }

    return false
  } catch {
    return false
  }
}


export async function safeRequest<T = any>(
  config: AxiosRequestConfig,
  retry = true
): Promise<ApiResponse<T>> {
  try {
    const token = await AsyncStorage.getItem('access_token')

    const authHeaders = token
      ? { Authorization: `Bearer ${token}` }
      : {}

    const mergedConfig = {
      ...config,
      headers: {
        ...authHeaders,
        ...config.headers,
      },
    }

    const res: AxiosResponse<T> = await axios(mergedConfig)
    return { status: res.status, data: res.data }
  } catch (err: any) {
    const errorData = err?.response?.data || { message: 'Something went wrong' }
    const statusCode = err?.response?.status

    if (statusCode === 401 && retry) {
      const refreshed = await refreshToken()
      
      if (refreshed) {
        return safeRequest(config, false)
      } else {
        triggerLogout()
      }
    }

    return { status: statusCode, data: errorData }
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
  } as ToIndonesianDateOptions)
}

export function stripHtml(html: string): string {
  return html ? html.replace(/<[^>]+>/g, '') : ''
}

export async function saveKeychain(key: string, value: string): Promise<boolean> {
  try {
    await Keychain.setGenericPassword(key, value, { service: key })
    return true
  } catch (error) {
    console.error('Error saving keychain:', error)
    return false
  }
}

export async function getKeychain(key: string): Promise<string | null> {
  try {
    const credentials = await Keychain.getGenericPassword({ service: key })
    if (credentials) {
      return credentials.password
    }
    return null
  } catch (error) {
    console.error('Error getting key chain:', error)
    return null
  }
}

export async function removeKeychain(key: string): Promise<boolean> {
  try {
    await Keychain.resetGenericPassword({ service: key })
    return true
  } catch (error) {
    console.error('Error removing keychain:', error)
    return false
  }
}