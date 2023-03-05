import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import type { LoginUser } from '@/types'

interface AuthState {
  isLoggedIn: boolean
  accessToken: string | null
  refreshToken: string | null
  loginUser: LoginUser | null
  setLoggedIn: (isLoggedIn: boolean) => void
  setAccessToken: (accessToken: string | null) => void
  setRefreshToken: (refreshToken: string | null) => void
  setLoginUser: (loginUser: LoginUser | null) => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null,
      loginUser: null,
      setLoggedIn: (isLoggedIn: boolean) =>
        set((state) => ({ ...state, isLoggedIn })),
      setAccessToken: (accessToken: string | null) =>
        set((state) => ({ ...state, accessToken })),
      setRefreshToken: (refreshToken: string | null) =>
        set((state) => ({ ...state, refreshToken })),
      setLoginUser: (loginUser: LoginUser | null) =>
        set((state) => ({ ...state, loginUser })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default useAuthStore
