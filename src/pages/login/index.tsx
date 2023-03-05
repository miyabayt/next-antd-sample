import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Input, Row, Button } from 'antd'
import { useRouter } from 'next/router'

import { styles } from './login.css'

import type { NextPage } from 'next'

const LoginPage: NextPage = () => {
  const router = useRouter()

  // isLoading: !error && !data,

  const handleSubmit = async (err?: Error) => {
    if (!err) {
      const originalPath = router.query['redirect_to'] as string
      const redurectTo = originalPath ?? '/'
      console.log('redirect to: ', redurectTo)
      await router.push(redurectTo)
    }
  }

  return (
    <>
      <div className={styles.form}>
        <div className={styles.logo}>
          <span>Sample Admin</span>
        </div>
        <Form onFinish={handleSubmit}>
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Username'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>
          <Row>
            <Button
              type='primary'
              htmlType='submit'
              loading={true}
              block={true}
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
