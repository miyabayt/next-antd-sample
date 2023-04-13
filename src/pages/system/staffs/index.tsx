import { DownloadOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, Input, Row, Space, Table } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'

import LoginRequired from '@/components/atoms/LoginRequired'
import SearchForm from '@/components/molecules/SearchForm'
import DefaultLayout from '@/components/templates/DefaultLayout'
import useStaffResource from '@/services/staffs/useStaffResource'
import { Staff } from '@/types'

import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
}

const StaffSearchPage = () => {
  const router = useRouter()
  const [query, setQuery] = useState({})
  const [expand, setExpand] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  })
  const { isLoading, data } = useStaffResource(query)
  const [form] = Form.useForm()

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
    const pagination = { current: 1 } // 1ページ目に戻す

    setTableParams({
      ...tableParams,
      pagination,
    })

    setQuery({ ...values, ...pagination })
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<Staff>,
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
    {
      title: 'アクション',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            type='text'
            icon={<EditOutlined />}
            onClick={() => {
              router.push(`/system/staffs/edit/${record.id}`)
            }}
          />
        </Space>
      ),
      align: 'center',
      width: 100,
    },
  ]

  return (
    <LoginRequired>
      <DefaultLayout>
        <Card
          title='担当者マスタ検索'
          extra={
            <Button
              type='primary'
              icon={<PlusOutlined />}
              style={{ minWidth: 100 }}
              onClick={() => {
                router.push('/system/staffs/new')
              }}
              ghost
            >
              新規登録
            </Button>
          }
          bordered={true}
        >
          <SearchForm
            form={form}
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
          <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
            <Row align='middle' justify='end'>
              <Col>
                <Button
                  type='primary'
                  icon={<DownloadOutlined />}
                  style={{ minWidth: 80, backgroundColor: 'blue-1' }}
                  disabled={!data?.count}
                >
                  CSVダウンロード
                </Button>
              </Col>
            </Row>
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

export default StaffSearchPage
