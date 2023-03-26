import { AxiosRequestConfig } from 'axios'

import useApiResource from '@/hooks/useApiResource'
import fetcher from '@/utils/fetcher'

interface SearchHolidayParams {
  holidayName?: string
  page?: number
  perpage?: number
}

const useHolidayResource = (params?: SearchHolidayParams) => {
  const query = { ...params }
  return useApiResource(
    ['holidays', query],
    async (config?: AxiosRequestConfig) => {
      return fetcher('/api/system/holidays/search', {
        ...config,
        method: 'POST',
        data: query,
      }).then(({ data }) => data)
    },
  )
}

export default useHolidayResource
