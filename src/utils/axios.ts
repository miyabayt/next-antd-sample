import axios, { AxiosInstance, AxiosResponse } from 'axios'

import useAuthStore from '@/stores/useAuthStore'

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.API_BASE_URL,
    timeout: parseInt(process.env.AXIOS_TIMEOUT || '3000'),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  instance.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
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
