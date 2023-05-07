import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type PaginationData = {
  key: string
  current: number | undefined
  pageSize: number | undefined
}

interface PaginationState {
  pagination: PaginationData[]
  getCurrent: (key: string) => number | undefined
  getPageSize: (key: string) => number | undefined
  setCurrent: (key: string, current: number) => void
  setPageSize: (key: string, pageSize: number) => void
}

const usePaginationStore = create<PaginationState>()(
  persist(
    (set, get) => ({
      pagination: [],
      getCurrent: (key: string) => {
        const p = get().pagination.find((p) => p.key === key)
        return p ? p.current : undefined
      },
      getPageSize: (key: string) => {
        const p = get().pagination.find((p) => p.key === key)
        return p ? p.pageSize : undefined
      },
      setCurrent: (key: string, current: number) => {
        set((state) => {
          const found = state.pagination.find((p) => p.key === key)
          if (!found) {
            return {
              ...state,
              pagination: [...state.pagination, { key, current, pageSize: 20 }],
            }
          } else {
            return {
              ...state,
              pagination: state.pagination.map((item) =>
                item.key === key ? { ...item, current } : item,
              ),
            }
          }
        })
      },
      setPageSize: (key: string, pageSize: number) => {
        set((state) => {
          const found = state.pagination.find((p) => p.key === key)
          if (!found) {
            return {
              ...state,
              pagination: [...state.pagination, { key, current: 1, pageSize }],
            }
          } else {
            return {
              ...state,
              pagination: state.pagination.map((item) =>
                item.key === key ? { ...item, pageSize } : item,
              ),
            }
          }
        })
      },
    }),
    {
      name: 'pagination-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default usePaginationStore
