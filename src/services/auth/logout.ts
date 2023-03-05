import { fetcher } from '@/utils'

const signout = async (): Promise<{ message: string }> => {
  return await fetcher('/auth/logout', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export default signout
