import { AxiosRequestConfig } from 'axios'

import fetcher from '@/utils/fetcher'
import useApiResource from '@/utils/useApiResource'

interface SearchUserParams {
  fullName?: string
  current?: number
  pageSize?: number
}

const useUserResource = (params?: SearchUserParams) => {
  const query = { ...params }
  return useApiResource(
    ['users', query],
    async (config?: AxiosRequestConfig) => {
      const page = (query.current || 1) - 1
      const pageSize = query.pageSize || 20
      return fetcher(`/api/user/users/search?page=${page}&size=${pageSize}`, {
        ...config,
        method: 'POST',
        data: query,
      }).then(({ data }) => data)
    },
  )
}

export default useUserResource
