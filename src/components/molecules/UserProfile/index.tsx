import { Avatar, Button, Col, Dropdown, Menu, Row, Space, Switch } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'

import useLoginUser from '@/hooks/useLoginUser'
import logout from '@/services/auth/logout'
import useAuthStore from '@/stores/useAuthStore'

import { styles } from './style.css'

import type { MenuProps } from 'antd'

const UserProfile = () => {
  const router = useRouter()
  const { isLoading, data: loginUser } = useLoginUser()
  const {
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    setLoggedIn,
    setLoginUser,
  } = useAuthStore()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  if (isLoading) {
    return <Avatar className={styles.avatar} icon={<AiOutlineUser />} />
  }

  const handleLogout = async () => {
    const { status } = await logout(accessToken, refreshToken)

    if (status < 500) {
      setAccessToken(null)
      setRefreshToken(null)
      setLoggedIn(false)
      setLoginUser(null)

      router.push('/login')
      return
    }

    // TODO: toast?
  }

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: `${loginUser?.firstName} さん`,
      onTitleClick: ({ domEvent }) => {
        domEvent.preventDefault()
        return false
      },
    },
    {
      key: '2',
      type: 'divider',
    },
    {
      key: 'darkMode',
      label: (
        <Space size='large'>
          ダークモード
          <Switch size='small' onClick={(_checked, e) => e.stopPropagation()} />
        </Space>
      ),
    },
    {
      key: '4',
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'ログアウト',
      onClick: async () => {
        await handleLogout()
        setDropdownOpen(false)
      },
    },
  ]

  const dropdownRender = () => (
    <Menu items={items} onMouseDown={(e) => e.stopPropagation()} />
  )

  return (
    <Dropdown
      overlayClassName={styles.dropdownMenu}
      dropdownRender={dropdownRender}
      placement='bottomRight'
      arrow={true}
      trigger={['hover']}
      //onOpenChange={}
      //open={dropdownOpen}
    >
      <Avatar className={styles.avatar} icon={<AiOutlineUser />} />
    </Dropdown>
  )
}

export default UserProfile
