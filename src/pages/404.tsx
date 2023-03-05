import { Button } from 'antd'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import ErrorPageLayout from '@/components/templates/ErrorPageLayout'
import { styles } from '@/styles/globals.css'

const NotFoundErrorPage: NextPage = () => {
  const router = useRouter()
  return (
    <ErrorPageLayout>
      <div className={styles.errorPage}>
        <h1>404 Not Found</h1>
        <h3>ページが見つかりませんでした。</h3>
        <Button
          type='primary'
          onClick={() => {
            router.back()
          }}
        >
          戻る
        </Button>
      </div>
    </ErrorPageLayout>
  )
}

export default NotFoundErrorPage
