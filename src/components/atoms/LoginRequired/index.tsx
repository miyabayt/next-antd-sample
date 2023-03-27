import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import useAuthStore from '@/stores/useAuthStore'
import { isTokenExpired } from '@/utils/jwt'

type LoginRequiredProps = {
  children: React.ReactNode
}

const LoginRequired = ({ children }: LoginRequiredProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isTokenValid, setIsTokenValid] = useState(false)
  const { accessToken } = useAuthStore((state) => state)

  useEffect(() => {
    const checkAuth = async () => {
      const expired = isTokenExpired(accessToken)
      if (expired || !accessToken) {
        console.log('checkAuth: invalid')
        setIsTokenValid(false)
        router.push({
          pathname: '/login',
          query: {
            redirect_to: router.pathname,
          },
        })
      } else {
        console.log('checkAuth: valid')
        setIsTokenValid(true)
      }
      setIsLoading(false)
    }

    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  if (isLoading) {
    return <LoadingSpinner loading={isLoading} />
  }

  return <>{isTokenValid ? <>{children}</> : null}</>
}

export default LoginRequired
