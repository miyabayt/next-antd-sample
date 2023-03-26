import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, Space, theme } from 'antd'
import React, { useState } from 'react'

interface SearchFormProps {
  name: string
  children: React.ReactNode
  expandable?: boolean // 詳細検索のトグル
  onFinish?: (values: FormData) => void
  onExpandChange?: (expanded: boolean) => void
}

const SearchForm = ({
  name,
  children,
  expandable = false,
  onFinish,
  onExpandChange,
}: SearchFormProps) => {
  // const { token } = theme.useToken()
  const [form] = Form.useForm()
  const [expand, setExpand] = useState(false)

  const formStyle = {
    padding: '16px 0',
  }

  return (
    <Form
      layout='horizontal'
      form={form}
      name={name}
      style={formStyle}
      onFinish={onFinish}
    >
      {children}
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Space size='middle'>
            <Button type='primary' htmlType='submit' style={{ minWidth: 80 }}>
              検索
            </Button>
            <Button
              style={{ minWidth: 80 }}
              onClick={() => {
                form.resetFields()
              }}
            >
              クリア
            </Button>
            {expandable && (
              <a
                style={{ fontSize: 12 }}
                onClick={() => {
                  setExpand(!expand)
                  if (onExpandChange) onExpandChange(expand)
                }}
              >
                {expand ? <UpOutlined /> : <DownOutlined />} 詳細検索
              </a>
            )}
          </Space>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchForm
