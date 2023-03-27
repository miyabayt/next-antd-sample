import 'antd/dist/reset.css'
import { cache } from '@emotion/css'
import { CacheProvider } from '@emotion/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App, ConfigProvider } from 'antd'
import jaJP from 'antd/locale/ja_JP'
import Head from 'next/head'
import { useRouter } from 'next/router'
import nProgress from 'nprogress'
import { useEffect } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group' // TODO

import {
  fadeEnter,
  fadeEnterActive,
  fadeExit,
  fadeExitActive,
} from '@/styles/globals'
import dayjs from '@/utils/dayjs'

import type { AppProps } from 'next/app'

import 'nprogress/nprogress.css'

nProgress.configure({ showSpinner: false }) // 右上に表示されるスピナーを非表示にする

function MyApp({ Component, pageProps }: AppProps) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <>
      <Head>
        <meta name='charset' content='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <CacheProvider value={cache}>
        <ConfigProvider
          theme={{
            token: {
              borderRadius: 3,
              colorBorder: '#d0d7de',
              colorBorderSecondary: '#d0d7de',
            },
          }}
          locale={jaJP}
        >
          {/* <SwitchTransition>
            <CSSTransition
              key={router.pathname}
              css={{
                enter: fadeEnter,
                enterActive: fadeEnterActive,
                exit: fadeExit,
                exitActive: fadeExitActive,
              }}
              timeout={400}
            > */}
          <App>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </App>
          {/* </CSSTransition>
          </SwitchTransition> */}
        </ConfigProvider>
      </CacheProvider>
    </>
  )
}

export default MyApp
