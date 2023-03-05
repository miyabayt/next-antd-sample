import axios, { AxiosInstance, AxiosResponse } from 'axios'

import refresh from '@/services/auth/refresh'
import useAuthStore from '@/stores/useAuthStore'
import { isTokenExpired } from '@/utils/jwt'

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.API_BASE_URL,
    timeout: parseInt(process.env.AXIOS_TIMEOUT || '3000'),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  instance.interceptors.request.use(async (config) => {
    const { accessToken, refreshToken } = useAuthStore.getState()

    let newAccessToken = accessToken
    if (accessToken && refreshToken && isTokenExpired(accessToken)) {
      try {
        console.info('try to refresh token...')
        const { data } = await refresh(accessToken, refreshToken)
        if (data.accessToken) {
          newAccessToken = data.accessToken
        }
      } catch (e) {
        console.info('failed to refresh token.')
      }
    }

    config.headers.Authorization = `Bearer ${newAccessToken}`

    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error.response as AxiosResponse)
    },
  )

  return instance
}

const axiosInstance: AxiosInstance = createAxiosInstance()
export default axiosInstance
