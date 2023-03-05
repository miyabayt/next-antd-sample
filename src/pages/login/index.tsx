import { Form, Input, Row, Button } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'

import login from '@/services/auth/login'
import useAuthStore from '@/stores/useAuthStore'

import { styles } from './style.css'

import type { NextPage } from 'next'

interface LoginForm {
  username: string
  password: string
}

const LoginPage: NextPage = () => {
  const router = useRouter()
  const [form] = Form.useForm<LoginForm>()
  const [isLoading, setIsLoading] = useState(false)
  const { setLoggedIn, setAccessToken, setRefreshToken } = useAuthStore(
    (state) => state,
  )

  const handleSubmit = async (values: LoginForm) => {
    try {
      setIsLoading(true)
      const { data, success } = await login(values.username, values.password)

      if (success) {
        setAccessToken(data.accessToken)
        setRefreshToken(data.refreshToken)
        setLoggedIn(true)
        const originalPath = router.query['redirect_to'] as string
        const redirectTo = originalPath ?? '/'
        console.log('redirect to: ', redirectTo)
        await router.push(redirectTo)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className={styles.form}>
        <div className={styles.logo}>
          <strong>Sample Admin</strong>
        </div>
        <Form form={form} onFinish={handleSubmit} layout='vertical'>
          <Form.Item
            label='ログインID'
            required
            name='username'
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input size='large' />
          </Form.Item>
          <Form.Item
            label='パスワード'
            required
            name='password'
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input type='password' size='large' />
          </Form.Item>
          <Row style={{ marginTop: '48px' }}>
            <Button
              type='primary'
              htmlType='submit'
              loading={isLoading}
              block={true}
              size='large'
            >
              ログイン
            </Button>
          </Row>
        </Form>
      </div>
    </>
  )
}

export default LoginPage
