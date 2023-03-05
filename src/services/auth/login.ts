import axios from 'axios'

import useAuthStore from '@/stores/useAuthStore'

interface AccessToken {
  accessToken: string
  refreshToken: string
}

const login = async (
  username: string,
  password: string,
): Promise<{ data: AccessToken; success: boolean; message: string }> => {
  const { setAccessToken, setRefreshToken } = useAuthStore.getState()

  return axios
    .request({
      url: '/api/auth/login',
      method: 'POST',
      data: JSON.stringify({ username, password }),
    })
    .then(({ data }) => {
      const { accessToken, refreshToken } = data?.data as AccessToken
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
      console.log('accessToken: ' + accessToken)
      return data
    })
}

export default login
