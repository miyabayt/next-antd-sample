import { Layout, Menu } from 'antd'
import cloneDeep from 'lodash/cloneDeep'

import AppLogo from '@/components/molecules/AppLogo'
import getMenus from '@/services/menus/get-menus'
import useSettingsStore from '@/stores/useSettingsStore'

import { styles } from './style.css'

import type { MenuProps } from 'antd'

const { Sider } = Layout

const AppSidebar = () => {
  const { collapsed, activeMenuKey, setActiveMenuKey } = useSettingsStore(
    (state) => state,
  )

  const sidebarItems = cloneDeep(getMenus())

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => activeMenuKey.indexOf(key) === -1)
    setActiveMenuKey(latestOpenKey ? latestOpenKey : '')
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={240}
      collapsedWidth={50}
      className={styles.sider}
      theme='light'
    >
      <AppLogo collapseLogo={true} />
      <Menu
        mode='inline'
        theme='light'
        style={{ border: 0 }}
        activeKey={activeMenuKey}
        onOpenChange={onOpenChange}
        items={sidebarItems}
        defaultActiveFirst={true}
      />
    </Sider>
  )
}

export default AppSidebar
