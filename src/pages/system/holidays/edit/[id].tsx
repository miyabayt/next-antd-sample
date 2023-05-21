import { App, Card, Form } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'

import LoginRequired from '@/components/atoms/LoginRequired'
import HolidayForm from '@/components/organisms/HolidayForm'
import DefaultLayout from '@/components/templates/DefaultLayout'
import updateHoliday from '@/services/holidays/updateHoliday'
import useHoliday from '@/services/holidays/useHoliday'
import { Holiday } from '@/types/holiday'
import dayjs from '@/utils/dayjs'

const HolidayEditPage = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [isSaving, setIsSaving] = useState(false)
  const { isLoading, data: holiday } = useHoliday(router.query.id as string)
  const { message } = App.useApp()

  if (!isLoading && holiday) {
    form.setFieldsValue({ ...holiday, holidayDate: dayjs(holiday.holidayDate) })
  }

  const handleSubmit = async (values: Holiday) => {
    try {
      setIsSaving(true)
      const updated = await updateHoliday({
        holiday: { ...holiday, ...values },
      })
      router.push(`/system/holidays/show/${updated.id}`)
      message.success('データ更新が成功しました。')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <LoginRequired>
      <DefaultLayout>
        <Card title='祝日マスタ編集' loading={isLoading} bordered>
          <HolidayForm
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

export default HolidayEditPage
