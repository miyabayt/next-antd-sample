import { css } from '@emotion/react'
import { Layout, Menu } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import AppLogo from '@/components/molecules/AppLogo'
import getMenus from '@/services/menus/getMenus'
import getRoutes from '@/services/routes/getRoutes'
import useSettingsStore from '@/stores/useSettingsStore'

import type { MenuProps } from 'antd'

const { Sider } = Layout

const AppSidebar = () => {
  const router = useRouter()
  const [sidebarItems, setSidebarItems] = useState<MenuProps['items']>([])
  const {
    collapsed,
    openKeys,
    activeMenuKeys,
    setOpenKeys,
    setActiveMenuKeys,
  } = useSettingsStore((state) => state)

  useEffect(() => {
    const menus = getMenus()
    setSidebarItems(menus)

    const routes = getRoutes()
    const route = routes.find((r) => r.path === router.pathname)
    if (route) {
      setOpenKeys([route.menuCode])
      setActiveMenuKeys([route.path])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    setOpenKeys(latestOpenKey ? [latestOpenKey] : [''])
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={260}
      collapsedWidth={50}
      css={styles.sider}
      theme='light'
    >
      <AppLogo collapseLogo={true} />
      <div css={styles.menuContainer}>
        <Menu
          mode='inline'
          theme='light'
          style={{ border: 0 }}
          selectedKeys={activeMenuKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          items={sidebarItems}
        />
      </div>
    </Sider>
  )
}

const styles = {
  sider: css`
    border-right: 1px solid #d0d7de;
  `,

  menuContainer: css`
    height: calc(100vh - 50px);
  `,
}

export default AppSidebar
