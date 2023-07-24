import Cookie from 'js-cookie'
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
  const { loginUser, setRedirectTo } = useAuthStore((state) => state)

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)
      try {
        const accessToken = Cookie.get('access_token')
        const expired = isTokenExpired(accessToken)
        if (expired || !accessToken) {
          console.log('checkAuth: invalid')
          setIsTokenValid(false)
          setRedirectTo(router)
          router.push('/login')
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
  }, [loginUser])

  if (!loginUser || !isTokenValid) {
    console.log('loading...')
    return <LoadingSpinner loading={isLoading} />
  }

  return <>{children}</>
}

export default LoginRequired
