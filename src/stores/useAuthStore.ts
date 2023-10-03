import { NextRouter } from 'next/router'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import encryptedSessionStorage from '@/stores/encryptedSessionStorage'

import type { LoginUser } from '@/types'

interface AuthState {
  loginUser: LoginUser | null
  redirectTo: NextRouter | null
  setLoginUser: (loginUser: LoginUser | null) => void
  setRedirectTo: (redirectTo: NextRouter | null) => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      loginUser: null,
      redirectTo: null,
      setLoginUser: (loginUser: LoginUser | null) =>
        set((state) => ({ ...state, loginUser })),
      setRedirectTo: (redirectTo: NextRouter | null) =>
        set((state) => ({ ...state, redirectTo })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => encryptedSessionStorage),
    },
  ),
)

export default useAuthStore
