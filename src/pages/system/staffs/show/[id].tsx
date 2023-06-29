import { EditOutlined } from '@ant-design/icons'
import { App, Button, Card, Descriptions, Modal, Row, Space } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'

import LoginRequired from '@/components/atoms/LoginRequired'
import DefaultLayout from '@/components/templates/DefaultLayout'
import deleteStaff from '@/services/staffs/deleteStaff'
import useStaff from '@/services/staffs/useStaff'

const StaffDetailPage = () => {
  const router = useRouter()
  const [showConfirm, setShowConfirm] = useState(false)
  const { isLoading, data: staff } = useStaff(router.query.id as string)
  const { message } = App.useApp()

  const handleOkClick = async () => {
    await deleteStaff(router.query.id as string)
    router.push('/system/staffs')
    message.success('データ削除が成功しました。')
    return true
  }

  return (
    <LoginRequired>
      <DefaultLayout>
        <Card
          title='担当者マスタ詳細'
          loading={isLoading}
          bordered
          extra={
            <Button
              type='primary'
              icon={<EditOutlined />}
              ghost
              onClick={() =>
                router.push({
                  pathname: `/system/staffs/edit/${router.query.id}`,
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
                  {staff.id}
                </Descriptions.Item>
                <Descriptions.Item label='氏名' span={3}>
                  {staff.fullName}
                </Descriptions.Item>
                <Descriptions.Item label='メールアドレス' span={3}>
                  {staff.email}
                </Descriptions.Item>
                <Descriptions.Item label='電話番号' span={3}>
                  {staff.tel}
                </Descriptions.Item>
                <Descriptions.Item label='登録日時' span={3}>
                  {staff.createdAt}
                </Descriptions.Item>
                <Descriptions.Item label='更新日時' span={3}>
                  {staff.updatedAt}
                </Descriptions.Item>
              </Descriptions>
              <Row justify='center'>
                <Space direction='horizontal' size='middle'>
                  <Button
                    type='primary'
                    style={{ minWidth: 100 }}
                    onClick={() =>
                      router.push({
                        pathname: '/system/staffs',
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

export default StaffDetailPage
