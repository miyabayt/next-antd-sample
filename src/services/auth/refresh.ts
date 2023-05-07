import axios from 'axios'
import Cookie from 'js-cookie'

import useAuthStore from '@/stores/useAuthStore'

interface AccessToken {
  accessToken: string
  refreshToken: string
}

const refresh = async (
  accessToken: string,
  refreshToken: string,
): Promise<{ data: AccessToken; success: boolean; message: string }> => {
  const { setAccessToken, setRefreshToken } = useAuthStore.getState()

  return await axios
    .request({
      url: '/api/auth/refresh',
      method: 'POST',
      data: { accessToken, refreshToken },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(({ data }) => {
      const { accessToken, refreshToken } = data?.data as AccessToken
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
      Cookie.set('access_token', accessToken)
      return data
    })
    .catch((e) => {
      setAccessToken(null)
      setRefreshToken(null)
      return Promise.reject(e)
    })
}

export default refresh
