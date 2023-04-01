import { AxiosResponse } from 'axios'

import useAuthStore from '@/stores/useAuthStore'
import axiosInstance from '@/utils/axios'

const logout = async (
  accessToken: string | null,
  refreshToken: string | null,
): Promise<AxiosResponse> => {
  const { setAccessToken, setRefreshToken, setLoginUser } =
    useAuthStore.getState()
  const clearAuth = (response: AxiosResponse) => {
    setAccessToken(null)
    setRefreshToken(null)
    setLoginUser(null)
    return Promise.resolve(response)
  }

  return axiosInstance
    .request({
      url: '/api/auth/logout',
      method: 'POST',
      data: JSON.stringify({ accessToken, refreshToken }),
    })
    .then((response) => {
      return clearAuth(response)
    })
    .catch((response) => {
      if (response.status < 500) {
        return clearAuth(response)
      }

      return Promise.reject(response)
    })
}

export default logout
