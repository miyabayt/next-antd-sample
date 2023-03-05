import { Card, Space } from 'antd'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import DefaultLayout from '@/components/templates/DefaultLayout'

export default function Home() {
  return (
    <DefaultLayout>
      <Card title='Hello'>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </DefaultLayout>
  )
}
