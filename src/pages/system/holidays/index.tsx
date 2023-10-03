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
  const { pagination, sort, setPagination, setSort } = usePagination(
    router.pathname,
  )
  const { isLoading, data } = useHolidaySearch({
    ...query,
    ...pagination,
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
    setPagination(router.pathname, pagination)
    setQuery({ ...values, ...pagination })
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<Holiday>,
  ) => {
    setPagination(router.pathname, pagination)
    //setSort(router.pathname, {...sorter})
    setQuery({
      ...query,
      ...pagination,
    })
  }

  const columns: ColumnsType<Holiday> = [
    {
      title: 'ID',
      render: (_, record) => (
        <Link href={`/system/holidays/show/${record.id}`}>{record.id}</Link>
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
              router.push(`/system/holidays/edit/${record.id}`)
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
                router.push('/system/holidays/new')
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
                current: pagination.current,
                pageSize: pagination.pageSize,
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
