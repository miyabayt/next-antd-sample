import { fetcher } from '@/utils'

const login = async (
  username: string,
  password: string,
): Promise<{ message: string }> => {
  return await fetcher('/auth/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
}

export default login
