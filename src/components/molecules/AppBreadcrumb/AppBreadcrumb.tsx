import { Breadcrumb } from 'antd'
import { useRouter } from 'next/router'

const AppBreadcrumb = () => {
  const router = useRouter()

  return (
    <Breadcrumb style={{ marginBottom: '16px' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>List</Breadcrumb.Item>
      <Breadcrumb.Item>App</Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default AppBreadcrumb
