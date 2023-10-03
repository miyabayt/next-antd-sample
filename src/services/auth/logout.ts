import { AxiosResponse } from 'axios'
import Cookie from 'js-cookie'

import useAuthStore from '@/stores/useAuthStore'
import axiosInstance from '@/utils/axios'

const logout = async (
  accessToken: string | undefined,
  refreshToken: string | undefined,
): Promise<AxiosResponse> => {
  const { setLoginUser } = useAuthStore.getState()
  const clearAuth = (response: AxiosResponse) => {
    Cookie.remove('access_token')
    Cookie.remove('refrest_token')
    setLoginUser(null)
    return Promise.resolve(response)
  }

  return axiosInstance
    .request({
      url: '/api/auth/logout',
      method: 'POST',
      data: { accessToken, refreshToken },
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
