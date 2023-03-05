import { AxiosRequestConfig, AxiosResponse } from 'axios'

import axiosInstance from '@/utils/axios'

const fetcher = (
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  return axiosInstance.request({ ...config, url })
}

export default fetcher
