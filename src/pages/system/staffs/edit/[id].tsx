import { App, Card, Form } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'

import LoginRequired from '@/components/atoms/LoginRequired'
import StaffForm from '@/components/organisms/StaffForm'
import DefaultLayout from '@/components/templates/DefaultLayout'
import updateStaff from '@/services/staffs/updateStaff'
import useStaff from '@/services/staffs/useStaff'
import { Staff } from '@/types/staff'

const StaffEditPage = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [isSaving, setIsSaving] = useState(false)
  const { isLoading, data: staff } = useStaff(router.query.id as string)
  const { message } = App.useApp()

  if (!isLoading && !isSaving && staff) {
    form.setFieldsValue({ ...staff })
  }

  const handleSubmit = async (values: Staff) => {
    try {
      setIsSaving(true)
      const updated = await updateStaff({ staff: { ...staff, ...values } })
      router.push({
        pathname: `/system/staffs/show/${updated.id}`,
        query: { page: router.query.page },
      })
      message.success('データ更新が成功しました。')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <LoginRequired>
      <DefaultLayout>
        <Card title='担当者マスタ編集' loading={isLoading} bordered>
          <StaffForm
            form={form}
            onSave={handleSubmit}
            buttonText='保存'
            loading={isSaving}
          />
        </Card>
      </DefaultLayout>
    </LoginRequired>
  )
}

export default StaffEditPage
