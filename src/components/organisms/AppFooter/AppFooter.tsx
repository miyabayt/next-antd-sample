import { Layout } from 'antd'

import { styles } from './style.css'
const { Footer } = Layout

const AppFooter = () => {
  return (
    <Footer className={styles.footer}>
      Copyright &copy; Sample Admin. All rights reserved.
    </Footer>
  )
}

export default AppFooter
