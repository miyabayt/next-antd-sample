import Link from 'next/link'
import { ReactElement } from 'react'
import { AiOutlineSetting, AiOutlineUser, AiOutlineHome } from 'react-icons/ai'

import type { MenuProps } from 'antd'

export type MenuItem = {
  key: string
  label: ReactElement | string
  icon?: ReactElement
  children?: MenuItem[]
}

const menus: MenuItem[] = [
  {
    key: '/',
    label: <Link href='/'>トップ</Link>,
    icon: <AiOutlineHome />,
  },
  {
    key: 'user-menu',
    label: '顧客管理',
    icon: <AiOutlineUser />,
    children: [
      {
        key: '/user/users',
        label: <Link href='/user/users'>顧客マスタ</Link>,
      },
    ],
  },
  {
    key: 'system-menu',
    label: 'システム設定',
    icon: <AiOutlineSetting />,
    children: [
      {
        key: '/system/staffs',
        label: <Link href='/system/staffs'>担当者マスタ</Link>,
      },
      {
        key: '/system/holidays',
        label: <Link href='/system/holidays'>祝日マスタ</Link>,
      },
    ],
  },
]

export default menus
