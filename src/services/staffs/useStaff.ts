import { AxiosRequestConfig } from 'axios'

import fetcher from '@/utils/fetcher'
import useApiResource from '@/utils/useApiResource'

const useStaff = (id: string) => {
  return useApiResource(
    ['staff', id],
    async (config?: AxiosRequestConfig) => {
      return await fetcher(`/api/system/staff/${id}`, {
        ...config,
        method: 'GET',
      }).then(({ data }) => data?.data)
    },
    {
      enabled: !!id,
    },
  )
}

export default useStaff
