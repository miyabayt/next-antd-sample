const routes = [
  {
    path: '/',
    title: 'トップ',
    parentPath: '/',
    menuCode: 'top',
  },
  {
    path: '/users/users',
    title: '顧客マスタ',
    parentPath: '/',
    menuCode: 'user-menu',
  },
  {
    path: '/users/users/:id',
    title: '顧客マスタ詳細',
    parentPath: '/users/users',
    menuCode: 'user-menu',
  },
  {
    path: '/users/users/new',
    title: '顧客マスタ登録',
    parentPath: '/users/users',
    menuCode: 'user-menu',
  },
  {
    path: '/system/staffs',
    title: '担当者マスタ',
    parentPath: '/system/staffs',
    menuCode: 'system-menu',
  },
  {
    path: '/system/staffs/:id',
    title: '担当者マスタ詳細',
    parentPath: '/system/staffs',
    menuCode: 'system-menu',
  },
  {
    path: '/system/staffs/new',
    title: '担当者マスタ登録',
    parentPath: '/system/staffs',
    menuCode: 'system-menu',
  },

  {
    path: '/system/holidays',
    title: '祝日マスタ',
    parentPath: '/',
    menuCode: 'system-menu',
  },
  {
    path: '/system/holidays/:id',
    title: '祝日マスタ詳細',
    parentPath: '/system/holidays',
    menuCode: 'system-menu',
  },
  {
    path: '/system/holidays/new',
    title: '祝日マスタ登録',
    parentPath: '/system/holidays',
    menuCode: 'system-menu',
  },

  {
    path: '/system/roles',
    title: 'ロール',
    parentPath: '/',
    menuCode: 'system-menu',
  },
  {
    path: '/system/roles/:id',
    title: 'ロール詳細',
    parentPath: '/system/roles',
    menuCode: 'system-menu',
  },
  {
    path: '/system/roles/new',
    title: 'ロール登録',
    parentPath: '/system/roles',
    menuCode: 'system-menu',
  },
  {
    path: '/system/codes',
    title: 'コードマスタ',
    parentPath: '/',
    menuCode: 'system-menu',
  },
  {
    path: '/system/codes/:id',
    title: 'コードマスタ詳細',
    parentPath: '/system/codes',
    menuCode: 'system-menu',
  },
  {
    path: '/system/codes/new',
    title: 'コードマスタ登録',
    parentPath: '/system/codes',
    menuCode: 'system-menu',
  },
]

export default routes
