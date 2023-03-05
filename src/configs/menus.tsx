import Link from 'next/link'
import { AiOutlineSetting, AiOutlineUser, AiOutlineHome } from 'react-icons/ai'

import type { MenuProps } from 'antd'

const menus: MenuProps['items'] = [
  {
    key: 'top',
    label: <Link href='/'>トップ</Link>,
    icon: <AiOutlineHome />,
  },
  {
    key: 'user-menu',
    label: '顧客管理',
    icon: <AiOutlineUser />,
    children: [
      {
        key: 'user',
        label: <Link href='/users/users'>顧客マスタ</Link>,
      },
    ],
  },
  {
    key: 'system-menu',
    label: 'システム設定',
    icon: <AiOutlineSetting />,
    children: [
      {
        key: 'staff',
        label: <Link href='/system/staffs'>担当者マスタ</Link>,
      },
      {
        key: 'holiday',
        label: <Link href='/system/holidays'>祝日マスタ</Link>,
      },
    ],
  },
]

export default menus
