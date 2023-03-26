import { Card, Col, DatePicker, Form, Input, Row, Space, Table } from 'antd'
import { useState } from 'react'

import LoginRequired from '@/components/atoms/LoginRequired'
import SearchForm from '@/components/molecules/SearchForm'
import DefaultLayout from '@/components/templates/DefaultLayout'
import useHolidayResource from '@/services/holidays/useHolidayResource'
import { Holiday } from '@/types/holiday'

import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'

const SearchHolidayPage = () => {
  const [query, setQuery] = useState({})
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const { isLoading, data } = useHolidayResource(query)

  const columns: ColumnsType<Holiday> = [
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

  const handleSearch = (values: FormData) => {
    setQuery(values)
  }

  return (
    <LoginRequired>
      <DefaultLayout>
        <Card bordered={false} loading={isLoading}>
          <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
            <SearchForm name='holidaySearchForm' onFinish={handleSearch}>
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
              dataSource={data?.data}
              columns={columns}
              pagination={{
                showSizeChanger: true,
                defaultPageSize: 20,
                pageSizeOptions: ['20', '50', '100'],
              }}
              size='small'
            />
          </Space>
        </Card>
      </DefaultLayout>
    </LoginRequired>
  )
}

export default SearchHolidayPage
