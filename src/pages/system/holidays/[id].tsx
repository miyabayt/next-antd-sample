import { Card, Col, Form, Input, Row, Space, Table } from 'antd'
import { useState } from 'react'

import LoginRequired from '@/components/atoms/LoginRequired'
import DefaultLayout from '@/components/templates/DefaultLayout'
import useStaffResource from '@/services/staffs/useStaffResource'

const HolidayDetailPage = () => {
  return (
    <LoginRequired>
      <DefaultLayout>
        <>detail</>
      </DefaultLayout>
    </LoginRequired>
  )
}

export default HolidayDetailPage
