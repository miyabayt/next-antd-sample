import { useRouter } from 'next/router'

import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import useLoginUser from '@/hooks/useLoginUser'

type LoginRequiredProps = {
  children: React.ReactNode
}

const LoginRequired = ({ children }: LoginRequiredProps) => {
  const router = useRouter()
  const { isLoading, data: loginUser } = useLoginUser()

  if (isLoading) {
    return <LoadingSpinner loading={isLoading} />
  }

  if (router.isReady && !loginUser) {
    const currentPath = router.pathname

    router.push({
      pathname: '/login',
      query: {
        redirect_to: currentPath,
      },
    })
  }

  return <>{loginUser && <>{children}</>}</>
}

export default LoginRequired
