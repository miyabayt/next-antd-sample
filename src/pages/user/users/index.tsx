import { DownloadOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, Input, Row, Space, Table } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import LoginRequired from '@/components/atoms/LoginRequired'
import SearchForm from '@/components/molecules/SearchForm'
import DefaultLayout from '@/components/templates/DefaultLayout'
import usePagination from '@/services/usePagination'
import exportUserCsv from '@/services/users/exportUserCsv'
import useUserSearch from '@/services/users/useUserSearch'
import { User } from '@/types/user'

import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { SorterResult } from 'antd/es/table/interface'

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
}

const UserSearchPage = () => {
  const router = useRouter()
  const [query, setQuery] = useState({})
  const [expanded, setExpanded] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const { current, setCurrent, pageSize, setPageSize } = usePagination('users')
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: { current, pageSize },
  })
  const { isLoading, data } = useUserSearch(query)
  const [form] = Form.useForm()

  const onExpandChange = (expanded: boolean) => {
    setExpanded(!expanded)
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const handleSearch = (values: FormData) => {
    const pagination = {
      current: parseInt(router.query.page as string, 1),
      pageSize: parseInt(router.query.perpage as string, 20),
    }

    setTableParams({
      ...tableParams,
      pagination,
    })

    setQuery({ ...values, ...pagination })
    setCurrent(pagination.current)
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<User>,
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    })

    setQuery({
      ...query,
      ...pagination,
    })

    setCurrent(pagination.current)
    setPageSize(pagination.pageSize)

    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: pagination.current || 1,
        perpage: pagination.pageSize || 20,
      },
    })
  }

  const columns: ColumnsType<User> = [
    {
      title: 'ID',
      render: (_, record) => (
        <Link href={`/user/users/show/${record.id}`}>{record.id}</Link>
      ),
    },
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
            type='link'
            icon={<EditOutlined />}
            onClick={() => {
              router.push(`/user/users/edit/${record.id}`)
            }}
          />
        </Space>
      ),
      align: 'center',
      width: 100,
    },
  ]

  const handleCsvExport = () => {
    exportUserCsv(query)
  }

  return (
    <LoginRequired>
      <DefaultLayout>
        <Card
          title='顧客マスタ検索'
          extra={
            <Button
              type='primary'
              icon={<PlusOutlined />}
              style={{ minWidth: 100 }}
              onClick={() => {
                router.push('/user/users/new')
              }}
              ghost
            >
              新規登録
            </Button>
          }
          bordered
        >
          <SearchForm
            form={form}
            name='userSearchForm'
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
            {expanded && (
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
                  style={{ minWidth: 100 }}
                  disabled={!data?.count}
                  onClick={handleCsvExport}
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
                  `${total}件中、${range[0]}〜${range[1]}件を表示`,
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

export default UserSearchPage
