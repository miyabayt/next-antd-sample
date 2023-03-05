import { Col, Layout, Row } from 'antd'
import React, { createElement } from 'react'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'

import AppLogo from '@/components/molecules/AppLogo'
import UserProfile from '@/components/molecules/UserProfile'
import useSettingsStore from '@/stores/useSettingsStore'

import { styles } from './style.css'
const { Header } = Layout

interface AppHeaderProps {
  showTrigger?: boolean // 折りたたみアイコン表示有無（サイドバーが無い場合はfalseにする）
  showUserProfile?: boolean
  showAppLogo?: boolean
}

const AppHeader = ({
  showTrigger = true,
  showUserProfile = true,
  showAppLogo = false,
}: AppHeaderProps) => {
  const { collapsed, setCollapsed } = useSettingsStore((state) => state)

  return (
    <Header className={styles.header}>
      <Row align='middle'>
        {showAppLogo && (
          <Col>
            <AppLogo />
          </Col>
        )}
        <Col flex='100px'>
          {showTrigger &&
            createElement(collapsed ? AiOutlineMenuUnfold : AiOutlineMenuFold, {
              className: `${styles.trigger}`,
              onClick: () => setCollapsed(!collapsed),
            })}
        </Col>
        <Col flex='auto' />
        <Col>{showUserProfile && <UserProfile />}</Col>
      </Row>
    </Header>
  )
}

export default AppHeader
