import { AxiosRequestConfig } from 'axios'

import useApiResource from '@/hooks/useApiResource'
import fetcher from '@/utils/fetcher'

interface SearchStaffParams {
  fullName?: string
  page?: number
  perpage?: number
}

const useStaffResource = (params?: SearchStaffParams) => {
  const query = { ...params }
  return useApiResource(
    ['staffs', query],
    async (config?: AxiosRequestConfig) => {
      return fetcher('/api/system/staffs/search', {
        ...config,
        method: 'POST',
        data: query,
      }).then(({ data }) => data)
    },
  )
}

export default useStaffResource
