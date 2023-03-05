import axiosInstance from '@/utils/axios'

interface AccessToken {
  accessToken: string
  refreshToken: string
}

const login = async (
  username: string,
  password: string,
): Promise<{ data: AccessToken; success: boolean; message: string }> => {
  return await axiosInstance
    .request({
      url: '/api/auth/login',
      method: 'POST',
      data: JSON.stringify({ username, password }),
    })
    .then(({ data }) => data)
}

export default login
