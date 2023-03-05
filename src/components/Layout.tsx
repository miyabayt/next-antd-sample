import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Layout as antdLayout, Menu } from 'antd'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useState } from 'react'

const { Header, Sider, Content } = antdLayout

type LayoutProps = Required<{
  readonly children: ReactElement
}>

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter()

  return <></>
}

export default Layout
