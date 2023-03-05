import axios from 'axios'

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
      data: JSON.stringify({ accessToken, refreshToken }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(({ data }) => {
      const { accessToken, refreshToken } = data?.data as AccessToken
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
      return data
    })
}

export default refresh
