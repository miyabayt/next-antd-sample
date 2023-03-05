import routes from '@/configs/routes'

interface Route {
  path: string
  title: string
  parentPath: string
  menuCode: string
}

const getRoutes = async (): Promise<Route[]> => {
  return routes
}

export default getRoutes
