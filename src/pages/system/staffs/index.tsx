import { Card, Col, Form, Input, Row, Space, Table } from 'antd'
import { useEffect, useState } from 'react'

import LoginRequired from '@/components/atoms/LoginRequired'
import SearchForm from '@/components/molecules/SearchForm'
import DefaultLayout from '@/components/templates/DefaultLayout'
import useStaffResource from '@/services/staffs/useStaffResource'

import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'

interface DataType {
  name: {
    first: string
    last: string
  }
  gender: string
  email: string
  login: {
    uuid: string
  }
}

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue>
}

const SearchStaffPage = () => {
  const [expand, setExpand] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  })
  const { isLoading, data } = useStaffResource()

  const columns: ColumnsType<DataType> = [
    {
      title: '氏名',
      dataIndex: 'firstName',
      render: (name) => `${name.first} ${name.last}`,
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
    setExpand(expand)
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  // useEffect(() => {
  //   fetchData();
  // }, [JSON.stringify(tableParams)]);

  return (
    <LoginRequired>
      <DefaultLayout>
        <Card bordered={false}>
          <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
            <SearchForm
              name='staffSearchForm'
              expandable
              onExpandChange={onExpandChange}
            >
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item name='name' label='氏名'>
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

export default SearchStaffPage
