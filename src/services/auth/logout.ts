import { AxiosResponse } from 'axios'

import axiosInstance from '@/utils/axios'

const logout = async (
  accessToken: string | null,
  refreshToken: string | null,
): Promise<AxiosResponse> => {
  return await axiosInstance
    .request({
      url: '/api/auth/logout',
      method: 'POST',
      data: JSON.stringify({ accessToken, refreshToken }),
    })
    .catch((response) => {
      if (response.status < 500) {
        return Promise.resolve(response)
      }
      return Promise.reject(response)
    })
}

export default logout
