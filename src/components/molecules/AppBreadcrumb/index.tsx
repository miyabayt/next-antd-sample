import { Breadcrumb } from 'antd'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import getRoutes from '@/services/routes/getRoutes'

const AppBreadcrumb = () => {
  const router = useRouter()
  const [breadcrumbs, setBreadcrumbs] = useState<ItemType[]>([])

  useEffect(() => {
    const routes = getRoutes()
    const route = routes.find((r) => r.path === router.pathname)
    const tempBreadcrumbs = routes.filter((r) => {
      return r.path === '/' || (route && r.path === route.parentPath)
    })

    if (route && !tempBreadcrumbs.some((b) => b.path === route.path)) {
      tempBreadcrumbs.push(route)
    }

    const building: ItemType[] = []
    const sliced = tempBreadcrumbs.slice(0, 3)
    for (let i = 0; i < sliced.length; i++) {
      const { path, title } = sliced[i]
      if (path === route?.path) {
        building.push({ title })
      } else {
        building.push({ title: <Link href={path}>{title}</Link> })
      }
    }
    setBreadcrumbs(building)
  }, [router])

  return <Breadcrumb items={breadcrumbs} style={{ marginBottom: '16px' }} />
}

export default AppBreadcrumb
