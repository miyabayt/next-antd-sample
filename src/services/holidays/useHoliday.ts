import { AxiosRequestConfig } from 'axios'

import fetcher from '@/utils/fetcher'
import useApiResource from '@/utils/useApiResource'

const useHoliday = (id: string) => {
  return useApiResource(
    ['holiday', id],
    async (config?: AxiosRequestConfig) => {
      return await fetcher(`/api/system/holiday/${id}`, {
        ...config,
        method: 'GET',
      }).then(({ data }) => data?.data)
    },
    {
      enabled: !!id,
    },
  )
}

export default useHoliday
