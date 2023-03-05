import axios from 'axios'

import useAuthStore from '@/stores/useAuthStore'
import { LoginUser } from '@/types'

const getLoginUser = async (): Promise<{
  data: LoginUser
  success: boolean
  message: string
}> => {
  const { accessToken } = useAuthStore.getState()

  return axios
    .request({
      url: '/api/auth/me',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(({ data }) => data)
}

export default getLoginUser
