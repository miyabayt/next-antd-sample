import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SettingsState {
  collapsed: boolean
  activeMenuKey: string
  setCollapsed: (collapsed: boolean) => void
  setActiveMenuKey: (activeMenuKey: string) => void
}

const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      collapsed: false,
      activeMenuKey: '',
      setCollapsed: (collapsed: boolean) =>
        set((state) => ({ ...state, collapsed })),
      setActiveMenuKey: (activeMenuKey: string) =>
        set((state) => ({ ...state, activeMenuKey })),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default useSettingsStore
