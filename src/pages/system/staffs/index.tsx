import { Card } from 'antd'
import { NextPage } from 'next'

import LoginRequired from '@/components/atoms/LoginRequired'
import DefaultLayout from '@/components/templates/DefaultLayout'

const SearchStaffPage: NextPage = () => {
  return (
    <LoginRequired>
      <DefaultLayout>
        <Card title='Staff'>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </DefaultLayout>
    </LoginRequired>
  )
}

export default SearchStaffPage
