const routes = [
  {
    path: '/',
    title: 'トップ',
    parentPath: '/',
    menuCode: 'top',
  },
  {
    path: '/user/users',
    title: '顧客マスタ検索',
    parentPath: '/',
    menuCode: 'user-menu',
  },
  {
    path: '/user/users/show/[id]',
    title: '顧客マスタ詳細',
    parentPath: '/user/users',
    menuCode: 'user-menu',
  },
  {
    path: '/user/users/edit/[id]',
    title: '顧客マスタ編集',
    parentPath: '/user/users',
    menuCode: 'user-menu',
  },
  {
    path: '/user/users/new',
    title: '顧客マスタ登録',
    parentPath: '/user/users',
    menuCode: 'user-menu',
  },
  {
    path: '/system/staffs',
    title: '担当者マスタ検索',
    parentPath: '/system/staffs',
    menuCode: 'system-menu',
  },
  {
    path: '/system/staffs/show/[id]',
    title: '担当者マスタ詳細',
    parentPath: '/system/staffs',
    menuCode: 'system-menu',
  },
  {
    path: '/system/staffs/edit/[id]',
    title: '担当者マスタ編集',
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
    title: '祝日マスタ検索',
    parentPath: '/',
    menuCode: 'system-menu',
  },
  {
    path: '/system/holidays/show/[id]',
    title: '祝日マスタ詳細',
    parentPath: '/system/holidays',
    menuCode: 'system-menu',
  },
  {
    path: '/system/holidays/edit/[id]',
    title: '祝日マスタ編集',
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
    title: 'ロールマスタ検索',
    parentPath: '/',
    menuCode: 'system-menu',
  },
  {
    path: '/system/roles/show/[id]',
    title: 'ロールマスタ詳細',
    parentPath: '/system/roles',
    menuCode: 'system-menu',
  },
  {
    path: '/system/roles/edit/[id]',
    title: 'ロールマスタ編集',
    parentPath: '/system/roles',
    menuCode: 'system-menu',
  },
  {
    path: '/system/roles/new',
    title: 'ロールマスタ登録',
    parentPath: '/system/roles',
    menuCode: 'system-menu',
  },
  {
    path: '/system/codes',
    title: 'コードマスタ検索',
    parentPath: '/',
    menuCode: 'system-menu',
  },
  {
    path: '/system/codes/show/[id]',
    title: 'コードマスタ詳細',
    parentPath: '/system/codes',
    menuCode: 'system-menu',
  },
  {
    path: '/system/codes/edit/[id]',
    title: 'コードマスタ編集',
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
