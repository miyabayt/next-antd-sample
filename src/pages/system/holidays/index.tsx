import { Card, Col, DatePicker, Form, Input, Row, Space, Table } from 'antd'
import { useState } from 'react'

import LoginRequired from '@/components/atoms/LoginRequired'
import SearchForm from '@/components/molecules/SearchForm'
import DefaultLayout from '@/components/templates/DefaultLayout'
import useHolidayResource from '@/services/holidays/useHolidayResource'
import { Holiday } from '@/types/holiday'

import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
}

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

const SearchHolidayPage = () => {
  const [query, setQuery] = useState({})
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  })
  const { isLoading, data } = useHolidayResource(query)
  const [form] = Form.useForm()

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const handleSearch = (values: FormData) => {
    const pagination = { current: 1 } // 1ページ目に戻す

    setTableParams({
      ...tableParams,
      pagination,
    })

    setQuery({ ...values, ...pagination })
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<Holiday>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    })

    setQuery({
      ...query,
      ...pagination,
    })
  }

  return (
    <LoginRequired>
      <DefaultLayout>
        <Card bordered={false}>
          <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
            <SearchForm
              form={form}
              name='holidaySearchForm'
              onFinish={handleSearch}
            >
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
              rowKey='id'
              bordered
              loading={isLoading}
              rowSelection={rowSelection}
              dataSource={data?.data}
              columns={columns}
              pagination={{
                total: data?.count,
                current: tableParams.pagination?.current,
                pageSize: tableParams.pagination?.pageSize,
                showTotal: (total, range) =>
                  `${total}件中、${range[0]}〜${range[1]}を表示`,
                showSizeChanger: true,
                defaultPageSize: 20,
                pageSizeOptions: ['20', '50', '100'],
              }}
              onChange={handleTableChange}
              size='small'
            />
          </Space>
        </Card>
      </DefaultLayout>
    </LoginRequired>
  )
}

export default SearchHolidayPage
