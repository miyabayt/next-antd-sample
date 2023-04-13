import { Button, Card, Col, Form, Input, Row, Space, Table } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'

import LoginRequired from '@/components/atoms/LoginRequired'
import DefaultLayout from '@/components/templates/DefaultLayout'
import useStaffResource from '@/services/staffs/useStaffResource'

const HolidayNewPage = () => {
  const router = useRouter()

  return (
    <LoginRequired>
      <DefaultLayout>
        <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
          <Row align='middle'>
            <Col>祝日マスタ登録</Col>
          </Row>
          <Card bordered={true}></Card>
        </Space>
      </DefaultLayout>
    </LoginRequired>
  )
}

export default HolidayNewPage
