import { AxiosRequestConfig } from 'axios'

import useApiResource from '@/hooks/useApiResource'
import fetcher from '@/utils/fetcher'

import type { LoginUser } from '@/types'

const useLoginUser = () => {
  return useApiResource(['loginUser'], async (config?: AxiosRequestConfig) => {
    return fetcher('/api/auth/me', { ...config, method: 'GET' }).then(
      ({ data }) => data?.data as LoginUser,
    )
  })
}

export default useLoginUser
