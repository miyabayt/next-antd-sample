import { App, Card, Form } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'

import LoginRequired from '@/components/atoms/LoginRequired'
import StaffForm from '@/components/organisms/StaffForm'
import DefaultLayout from '@/components/templates/DefaultLayout'
import createStaff from '@/services/staffs/createStaff'
import { Staff } from '@/types'

const StaffNewPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()
  const { message } = App.useApp()

  const handleSubmit = async (staff: Staff) => {
    try {
      setIsLoading(true)
      const created = await createStaff({ staff })
      router.push(`/system/staffs/show/${created.id}`)
      message.success('データ登録が成功しました。')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LoginRequired>
      <DefaultLayout>
        <Card title='担当者マスタ登録' bordered>
          <StaffForm
            form={form}
            onSave={handleSubmit}
            buttonText='登録'
            loading={isLoading}
          />
        </Card>
      </DefaultLayout>
    </LoginRequired>
  )
}

export default StaffNewPage
