import { Button } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

import ErrorPageLayout from '@/components/templates/ErrorPageLayout'
import { styles } from '@/styles/globals'

const InternalServerErrorPage = () => {
  const router = useRouter()

  return (
    <ErrorPageLayout>
      <div css={styles.errorPage}>
        <h1>500 Internal Server Error</h1>
        <h3>システムエラーが発生しました。</h3>
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

export default InternalServerErrorPage
