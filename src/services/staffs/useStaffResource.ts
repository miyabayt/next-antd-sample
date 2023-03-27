import { AxiosRequestConfig } from 'axios'

import useApiResource from '@/hooks/useApiResource'
import fetcher from '@/utils/fetcher'

interface SearchStaffParams {
  fullName?: string
  current?: number
  pageSize?: number
}

const useStaffResource = (params?: SearchStaffParams) => {
  const query = { ...params }
  return useApiResource(
    ['staffs', query],
    async (config?: AxiosRequestConfig) => {
      const page = (query.current || 1) - 1
      const pageSize = query.pageSize || 20
      return fetcher(
        `/api/system/staffs/search?page=${page}&size=${pageSize}`,
        {
          ...config,
          method: 'POST',
          data: query,
        },
      ).then(({ data }) => data)
    },
  )
}

export default useStaffResource
