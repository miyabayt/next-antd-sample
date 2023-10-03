import { AxiosRequestConfig } from 'axios'

import fetcher from '@/utils/fetcher'
import useApiResource from '@/utils/useApiResource'

const useUser = (id: string) => {
  return useApiResource(
    ['user', id],
    async (config?: AxiosRequestConfig) => {
      return await fetcher(`/api/user/user/${id}`, {
        ...config,
        method: 'GET',
      }).then(({ data }) => data?.data)
    },
    {
      enabled: !!id,
    },
  )
}

export default useUser
