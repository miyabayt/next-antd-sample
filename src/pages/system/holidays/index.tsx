import { Card, Col, DatePicker, Form, Input, Row, Space, Table } from 'antd'
import { useState } from 'react'

import LoginRequired from '@/components/atoms/LoginRequired'
import SearchForm from '@/components/molecules/SearchForm'
import DefaultLayout from '@/components/templates/DefaultLayout'
import useHolidayResource from '@/services/holidays/useHolidayResource'

const SearchHolidayPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const { isLoading, data } = useHolidayResource()

  const columns = [
    {
      title: '名称',
      dataIndex: 'holidayName',
    },
    {
      title: '日付',
      dataIndex: 'holidayDate',
    },
  ]

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  return (
    <LoginRequired>
      <DefaultLayout>
        <Card bordered={false}>
          <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
            <SearchForm name='holidaySearchForm'>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item name='holidayName' label='名称'>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name='holidayDate' label='日付'>
                    <DatePicker />
                  </Form.Item>
                </Col>
              </Row>
            </SearchForm>
            <Table
              bordered
              rowSelection={rowSelection}
              loading={isLoading}
              dataSource={data?.data}
              columns={columns}
              size='small'
            />
          </Space>
        </Card>
      </DefaultLayout>
    </LoginRequired>
  )
}

export default SearchHolidayPage
