import { Layout } from 'antd'

import AppBreadcrumb from '@/components/molecules/AppBreadcrumb/AppBreadcrumb'
import AppFooter from '@/components/organisms/AppFooter/AppFooter'
import AppHeader from '@/components/organisms/AppHeader/AppHeader'
import AppSidebar from '@/components/organisms/AppSidebar/AppSidebar'

const { Content } = Layout

type LayoutProps = Required<{
  readonly children: React.ReactElement
}>

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <Layout>
      <AppSidebar />
      <Layout>
        <AppHeader />
        <Content
          style={{
            padding: '16px',
            minHeight: `calc(100vh - 100px)`,
            borderBottom: '1px solid #d9d9d9',
          }}
        >
          <AppBreadcrumb />
          {children}
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  )
}

export default DefaultLayout
