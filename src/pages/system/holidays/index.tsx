import { DownloadOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Space,
  Table,
} from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import LoginRequired from '@/components/atoms/LoginRequired'
import SearchForm from '@/components/molecules/SearchForm'
import DefaultLayout from '@/components/templates/DefaultLayout'
import exportHolidayCsv from '@/services/holidays/exportHolidayCsv'
import useHolidaySearch from '@/services/holidays/useHolidaySearch'
import usePagination from '@/services/usePagination'
import { Holiday } from '@/types/holiday'

import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { SorterResult } from 'antd/es/table/interface'

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
}

const HolidaySearchPage = () => {
  const router = useRouter()
  const [query, setQuery] = useState({})
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const { pageSize, setPageSize } = usePagination('holidays')
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: { current: Number(router.query.page) || 1, pageSize },
  })
  const { isLoading, data } = useHolidaySearch({
    ...query,
    ...tableParams.pagination,
  })
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

    setQuery({ ...values })

    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: pagination.current,
        perpage: pageSize,
      },
    })
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
    })
    setPageSize(pagination.pageSize)

    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: pagination.current,
        perpage: pagination.pageSize,
      },
    })
  }

  const columns: ColumnsType<Holiday> = [
    {
      title: 'ID',
      render: (_, record) => (
        <Link
          href={{
            pathname: `/system/holidays/show/${record.id}`,
            query: { page: router.query.page },
          }}
        >
          {record.id}
        </Link>
      ),
    },
    {
      title: '名称',
      dataIndex: 'holidayName',
    },
    {
      title: '日付',
      dataIndex: 'holidayDate',
    },
    {
      title: 'アクション',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            type='link'
            icon={<EditOutlined />}
            onClick={() => {
              router.push({
                pathname: `/system/holidays/edit/${record.id}`,
                query: { page: router.query.page },
              })
            }}
          />
        </Space>
      ),
      align: 'center',
      width: 100,
    },
  ]

  const handleCsvExport = () => {
    exportHolidayCsv(query)
  }

  return (
    <LoginRequired>
      <DefaultLayout>
        <Card
          title='祝日マスタ検索'
          extra={
            <Button
              type='primary'
              icon={<PlusOutlined />}
              style={{ minWidth: 100 }}
              onClick={() => {
                router.push({
                  pathname: '/system/holidays/new',
                  query: { page: router.query.page },
                })
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
                  <DatePicker style={{ minWidth: 180 }} />
                </Form.Item>
              </Col>
            </Row>
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

export default HolidaySearchPage
