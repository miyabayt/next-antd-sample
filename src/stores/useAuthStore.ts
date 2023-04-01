import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import encryptedSessionStorage from './encryptedSessionStorage'

import type { LoginUser } from '@/types'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  loginUser: LoginUser | null
  setAccessToken: (accessToken: string | null) => void
  setRefreshToken: (refreshToken: string | null) => void
  setLoginUser: (loginUser: LoginUser | null) => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      loginUser: null,
      setAccessToken: (accessToken: string | null) =>
        set((state) => ({ ...state, accessToken })),
      setRefreshToken: (refreshToken: string | null) =>
        set((state) => ({ ...state, refreshToken })),
      setLoginUser: (loginUser: LoginUser | null) =>
        set((state) => ({ ...state, loginUser })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => encryptedSessionStorage),
    },
  ),
)

export default useAuthStore
