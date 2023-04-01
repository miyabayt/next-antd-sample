import { css, ClassNames } from '@emotion/react'
import { Avatar, Button, Col, Dropdown, Menu, Row, Space, Switch } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'

import logout from '@/services/auth/logout'
import useAuthStore from '@/stores/useAuthStore'

import type { MenuProps } from 'antd'

const UserProfile = () => {
  const router = useRouter()
  const { accessToken, refreshToken, loginUser } = useAuthStore(
    (state) => state,
  )

  // TODO
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = async () => {
    const { status } = await logout(accessToken, refreshToken)

    if (status < 500) {
      router.push('/login')
      return
    }

    // TODO: toast?
  }

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: `${loginUser?.firstName} さん`,
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
    <ClassNames>
      {({ css }) => (
        <Dropdown
          overlayClassName={css(styles.dropdownMenu)}
          dropdownRender={dropdownRender}
          placement='bottomRight'
          arrow={true}
          trigger={['hover']}
          //onOpenChange={}
          //open={dropdownOpen} // TODO
        >
          <Avatar css={styles.avatar} icon={<AiOutlineUser />} />
        </Dropdown>
      )}
    </ClassNames>
  )
}

const styles = {
  avatar: css`
    padding-top: 2px;
    margin-top: -5px;
    cursor: pointer;
  `,

  dropdownMenu: css`
    width: 180px;
  `,
}

export default UserProfile
