import React, { createContext, useContext } from 'react'
import useSWR from 'swr'

import login from '@/services/auth/login'
import logout from '@/services/auth/logout'

import type { LoginUser } from '@/types'

type AuthContextType = {
  loginUser?: LoginUser
  isLoading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  mutate: (
    data?: LoginUser | Promise<LoginUser>,
    shouldRevalidate?: boolean,
  ) => Promise<LoginUser | undefined>
}

type AuthContextProviderProps = {
  loginUser?: LoginUser
}

const AuthContext = createContext<AuthContextType>({
  loginUser: undefined,
  isLoading: false,
  login: async () => Promise.resolve(),
  logout: async () => Promise.resolve(),
  mutate: async () => Promise.resolve(undefined),
})

export const useAuthContext = (): AuthContextType =>
  useContext<AuthContextType>(AuthContext)

export const AuthContextProvider = ({
  loginUser,
  children,
}: React.PropsWithChildren<AuthContextProviderProps>) => {
  const { data, error, mutate } = useSWR<LoginUser>('/auth/me')
  const isLoading = !data && !error

  const loginInternal = async (username: string, password: string) => {
    await login(username, password)
    await mutate()
  }

  const logoutInternal = async () => {
    await logout()
    await mutate()
  }

  return (
    <AuthContext.Provider
      value={{
        loginUser: data ?? loginUser,
        isLoading,
        login: loginInternal,
        logout: logoutInternal,
        mutate,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
