import { Layout } from 'antd'

import AppFooter from '@/components/organisms/AppFooter/AppFooter'
import AppHeader from '@/components/organisms/AppHeader/AppHeader'

const { Content } = Layout

type LayoutProps = Required<{
  readonly children: React.ReactElement
}>

const ErrorPageLayout = ({ children }: LayoutProps) => {
  return (
    <Layout>
      <Layout>
        <AppHeader showTrigger={false} showAppLogo={true} />
        <Content
          style={{
            padding: '16px',
            minHeight: `calc(100vh - 100px)`,
            borderBottom: '1px solid #d9d9d9',
          }}
        >
          {children}
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  )
}

export default ErrorPageLayout
