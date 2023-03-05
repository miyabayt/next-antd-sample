import { Spin } from 'antd'
import { AiOutlineLoading } from 'react-icons/ai'

import { styles } from './style.css'

type LoadingSpinnerProps = {
  loading: boolean
}

const antIcon = <AiOutlineLoading style={{ fontSize: 36 }} />

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  return (
    <>
      {props.loading && (
        <div className={styles.spinner}>
          <Spin indicator={antIcon} />
        </div>
      )}
    </>
  )
}

export default LoadingSpinner
