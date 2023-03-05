import { useRouter } from 'next/router'

import useSettingsStore from '@/stores/useSettingsStore'

import { styles } from './style.css'

interface AppLogoProps {
  collapseLogo?: boolean // サイドバーが無い場合はfalseにする
}

const AppLogo = ({ collapseLogo = false }: AppLogoProps) => {
  const router = useRouter()
  const { collapsed } = useSettingsStore((state) => state)

  return (
    <div
      className={styles.logo}
      onClick={() => {
        router.push('/')
      }}
    >
      <strong>{collapseLogo && collapsed ? <>SA</> : <>Sample Admin</>}</strong>
    </div>
  )
}

export default AppLogo
