import { EditOutlined } from '@ant-design/icons'
import { App, Button, Card, Descriptions, Modal, Row, Space } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'

import LoginRequired from '@/components/atoms/LoginRequired'
import DefaultLayout from '@/components/templates/DefaultLayout'
import deleteUser from '@/services/users/deleteUser'
import useUser from '@/services/users/useUser'

const UserDetailPage = () => {
  const router = useRouter()
  const [showConfirm, setShowConfirm] = useState(false)
  const { isLoading, data: user } = useUser(router.query.id as string)
  const { message } = App.useApp()

  const handleOkClick = async () => {
    await deleteUser(router.query.id as string)
    router.push({ pathname: '/user/users', query: { page: router.query.page } })
    message.success('データ削除が成功しました。')
    return true
  }

  return (
    <LoginRequired>
      <DefaultLayout>
        <Card
          title='顧客マスタ詳細'
          loading={isLoading}
          bordered
          extra={
            <Button
              type='primary'
              icon={<EditOutlined />}
              ghost
              onClick={() =>
                router.push({
                  pathname: `/user/users/edit/${router.query.id}`,
                  query: { page: router.query.page },
                })
              }
            >
              編集
            </Button>
          }
        >
          {!isLoading && (
            <Space
              direction='vertical'
              size='middle'
              style={{ display: 'flex' }}
            >
              <Descriptions
                size='small'
                labelStyle={{ width: 200, fontWeight: 600 }}
                bordered
              >
                <Descriptions.Item label='ID' span={3}>
                  {user.id}
                </Descriptions.Item>
                <Descriptions.Item label='氏名' span={3}>
                  {user.fullName}
                </Descriptions.Item>
                <Descriptions.Item label='メールアドレス' span={3}>
                  {user.email}
                </Descriptions.Item>
                <Descriptions.Item label='電話番号' span={3}>
                  {user.tel}
                </Descriptions.Item>
                <Descriptions.Item label='郵便番号' span={3}>
                  {user.zip}
                </Descriptions.Item>
                <Descriptions.Item label='住所' span={3}>
                  {user.address}
                </Descriptions.Item>
                <Descriptions.Item label='登録日時' span={3}>
                  {user.createdAt}
                </Descriptions.Item>
                <Descriptions.Item label='更新日時' span={3}>
                  {user.updatedAt}
                </Descriptions.Item>
              </Descriptions>
              <Row justify='center'>
                <Space direction='horizontal' size='middle'>
                  <Button
                    type='primary'
                    style={{ minWidth: 100 }}
                    onClick={() =>
                      router.push({
                        pathname: '/user/users',
                        query: { page: router.query.page },
                      })
                    }
                    ghost
                  >
                    戻る
                  </Button>
                  <Button
                    type='primary'
                    style={{ minWidth: 100 }}
                    onClick={() => setShowConfirm(true)}
                    danger
                  >
                    削除
                  </Button>
                  <Modal
                    title='確認'
                    open={showConfirm}
                    onOk={handleOkClick}
                    onCancel={() => setShowConfirm(false)}
                    okText='削除'
                    cancelText='キャンセル'
                    okType='danger'
                    centered
                  >
                    <p>データを削除します。よろしいですか？</p>
                  </Modal>
                </Space>
              </Row>
            </Space>
          )}
        </Card>
      </DefaultLayout>
    </LoginRequired>
  )
}

export default UserDetailPage
