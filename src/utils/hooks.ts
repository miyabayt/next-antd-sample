import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAuthContext } from '@/contexts/AuthContext'

export const useAuthGuard = (): void => {
  const router = useRouter()
  const { loginUser, isLoading } = useAuthContext()

  useEffect(() => {
    if (!loginUser && !isLoading) {
      const currentPath = router.pathname

      router.push({
        pathname: '/login',
        query: {
          redirect_to: currentPath,
        },
      })
    }
  }, [router, loginUser, isLoading])
}
