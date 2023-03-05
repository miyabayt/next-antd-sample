import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, ConfigProvider } from 'antd'
import jaJP from 'antd/locale/ja_JP'
import React, { useState } from 'react'

import { styles } from './layout.css'

import type { MenuProps } from 'antd'

const { Header, Footer, Sider, Content } = Layout

type LayoutProps = Required<{
  readonly children: React.ReactElement
}>

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
  ]),
  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 8', '8'),
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
  ]),
]

const DefaultLayout = ({ children }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const [openKeys, setOpenKeys] = useState(['sub1'])

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 4,
          padding: 10,
          paddingLG: 16,
        },
      }}
      locale={jaJP}
    >
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={240}
          collapsedWidth={50}
          style={{
            backgroundColor: '#fff',
            borderRight: '1px solid #d9d9d9',
            boxShadow:
              '0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)',
          }}
        >
          <div className={styles.logo} />
          <Menu
            mode='inline'
            style={{ border: 0 }}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              height: '50px',
              backgroundColor: '#fff',
              lineHeight: '48px',
              borderBottom: '1px solid #d9d9d9',
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: `${styles.trigger}`,
                onClick: () => setCollapsed(!collapsed),
              },
            )}
          </Header>
          <Content
            style={{
              padding: '16px',
              minHeight: `calc(100vh - 100px)`,
            }}
          >
            <Breadcrumb style={{ marginBottom: '16px' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            {children}
          </Content>
          <Footer
            style={{
              padding: '16px',
              height: '50px',
              backgroundColor: '#fff',
              borderTop: '1px solid #d9d9d9',
            }}
          >
            Copyright &copy; Sample Admin. All rights reserved.
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default DefaultLayout
