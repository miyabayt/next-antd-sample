import { Card, Col, Form, Input, Row, Space, Table } from 'antd'
import { useState } from 'react'

import LoginRequired from '@/components/atoms/LoginRequired'
import SearchForm from '@/components/molecules/SearchForm'
import DefaultLayout from '@/components/templates/DefaultLayout'
import useStaffResource from '@/services/staffs/useStaffResource'
import { Staff } from '@/types'

import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'

const SearchStaffPage = () => {
  const [query, setQuery] = useState({})
  const [expand, setExpand] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const { isLoading, data } = useStaffResource(query)

  const columns: ColumnsType<Staff> = [
    {
      title: '氏名',
      dataIndex: 'fullName',
      render: (_text, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'メールアドレス',
      dataIndex: 'email',
    },
    {
      title: '電話番号',
      dataIndex: 'tel',
    },
  ]

  const onExpandChange = (expand: boolean) => {
    setExpand(!expand)
  }

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
            <SearchForm
              name='staffSearchForm'
              expandable
              onExpandChange={onExpandChange}
              onFinish={handleSearch}
            >
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item name='fullName' label='氏名'>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name='email' label='メールアドレス'>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              {expand && (
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item name='tel' label='電話番号'>
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              )}
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

export default SearchStaffPage
