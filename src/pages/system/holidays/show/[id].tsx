import { EditOutlined } from '@ant-design/icons'
import { App, Button, Card, Descriptions, Modal, Row, Space } from 'antd'
import { useRouter } from 'next/router'

import { useState } from 'react'
import LoginRequired from '@/components/atoms/LoginRequired'
import DefaultLayout from '@/components/templates/DefaultLayout'
import deleteHoliday from '@/services/holidays/deleteHoliday'
import useHoliday from '@/services/holidays/useHoliday'

const HolidayDetailPage = () => {
  const router = useRouter()
  const [showConfirm, setShowConfirm] = useState(false)
  const { isLoading, data: holiday } = useHoliday(router.query.id as string)
  const { message } = App.useApp()

  const handleOkClick = async () => {
    await deleteHoliday(router.query.id as string)
    router.push('/system/holidays')
    message.success('データ削除が成功しました。')
    return true
  }

  return (
    <LoginRequired>
      <DefaultLayout>
        <Card
          title='祝日マスタ詳細'
          loading={isLoading}
          bordered
          extra={
            <Button
              type='primary'
              icon={<EditOutlined />}
              ghost
              onClick={() =>
                router.push(`/system/holidays/edit/${router.query.id}`)
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
                  {holiday.id}
                </Descriptions.Item>
                <Descriptions.Item label='名称' span={3}>
                  {holiday.holidayName}
                </Descriptions.Item>
                <Descriptions.Item label='日付' span={3}>
                  {holiday.holidayDate}
                </Descriptions.Item>
                <Descriptions.Item label='登録日時' span={3}>
                  {holiday.createdAt}
                </Descriptions.Item>
                <Descriptions.Item label='更新日時' span={3}>
                  {holiday.updatedAt}
                </Descriptions.Item>
              </Descriptions>
              <Row justify='center'>
                <Space direction='horizontal' size='middle'>
                  <Button
                    type='primary'
                    style={{ minWidth: 100 }}
                    onClick={() => router.push('/system/holidays')}
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

export default HolidayDetailPage
