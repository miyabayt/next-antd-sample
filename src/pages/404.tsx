import { Button } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

import ErrorPageLayout from '@/components/templates/ErrorPageLayout'
import { styles } from '@/styles/globals'

const NotFoundErrorPage = () => {
  const router = useRouter()

  return (
    <ErrorPageLayout>
      <div css={styles.errorPage}>
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
