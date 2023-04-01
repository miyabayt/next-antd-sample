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
  const [isLoading, setIsLoading] = useState(false)
  const [isTokenValid, setIsTokenValid] = useState(false)
  const { accessToken, setAccessToken } = useAuthStore((state) => state)

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)
      try {
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
      } finally {
        setIsLoading(false)
      }
    }

    if (!isLoading) checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  if (!accessToken) {
    console.log('loading...')
    return <LoadingSpinner loading={isLoading} />
  }

  return <>{children}</>
  //return <>{isTokenValid ? <>{children}</> : null}</>
}

export default LoginRequired
