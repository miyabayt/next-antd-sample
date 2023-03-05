import { AxiosRequestConfig } from 'axios'

import useApiResource from '@/hooks/useApiResource'
import fetcher from '@/utils/fetcher'

const useStaffResource = () => {
  return useApiResource(['staffs'], async (config?: AxiosRequestConfig) => {
    return fetcher('/api/system/staffs', { ...config, method: 'GET' }).then(
      ({ data }) => data,
    )
  })
}

export default useStaffResource
