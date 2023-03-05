import { Button } from 'antd'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import ErrorPageLayout from '@/components/templates/ErrorPageLayout'
import { styles } from '@/styles/globals.css'

const InternalServerErrorPage: NextPage = () => {
  const router = useRouter()

  return (
    <ErrorPageLayout>
      <div className={styles.errorPage}>
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
