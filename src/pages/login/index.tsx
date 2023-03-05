import { useRouter } from 'next/router'

import type { NextPage } from 'next'

const LoginPage: NextPage = () => {
  const router = useRouter()

  // 認証後のイベントハンドラ
  const handleLogin = async (err?: Error) => {
    if (!err) {
      const originalPath = router.query['redirect_to'] as string
      const redurectTo = originalPath ?? '/'
      console.log('redirect to: ', redurectTo)
      await router.push(redurectTo)
    }
  }

  return (
    <>
      <div
        style={{
          justifyContent: 'center',
        }}
      >
        aaa
      </div>
    </>
  )
}

export default LoginPage
