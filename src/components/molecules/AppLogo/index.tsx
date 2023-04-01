import { css } from '@emotion/react'
import { useRouter } from 'next/router'

import useSettingsStore from '@/stores/useSettingsStore'

interface AppLogoProps {
  collapseLogo?: boolean // サイドバーが無い場合はfalseにする
}

const AppLogo = ({ collapseLogo = false }: AppLogoProps) => {
  const router = useRouter()
  const { collapsed } = useSettingsStore((state) => state)

  return (
    <div
      css={styles.logo}
      onClick={() => {
        router.push('/')
      }}
    >
      <strong>{collapseLogo && collapsed ? <>SA</> : <>Sample Admin</>}</strong>
    </div>
  )
}

const styles = {
  logo: css`
    font-size: 1rem;
    height: 50px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
  `,
}

export default AppLogo
