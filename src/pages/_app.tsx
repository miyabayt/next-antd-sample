import 'antd/dist/reset.css'
import { App, ConfigProvider } from 'antd'
import jaJP from 'antd/locale/ja_JP'
import { useRouter } from 'next/router'
import nProgress from 'nprogress'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'

import 'nprogress/nprogress.css'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

nProgress.configure({ showSpinner: false })

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => {
      nProgress.start()
    }

    const handleStop = () => {
      nProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  })

  return getLayout(
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 4,
          padding: 10,
          paddingLG: 16,
        },
      }}
      locale={jaJP}
    >
      <App>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </App>
    </ConfigProvider>,
  )
}

export default MyApp
