import menus from '@/configs/menus'

import type { MenuProps } from 'antd'

const getMenus = (): MenuProps['items'] => {
  return menus
}

export default getMenus
