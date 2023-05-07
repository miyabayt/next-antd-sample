import usePaginationStore from '@/stores/usePaginationStore'

const usePagination = (key: string, initialPage = 1, initialPageSize = 20) => {
  const { getCurrent, setCurrent, getPageSize, setPageSize } =
    usePaginationStore((state) => state)

  const current = getCurrent(key)
  const pageSize = getPageSize(key)

  return {
    current: current ? current : initialPage,
    setCurrent: (current: number | undefined) =>
      setCurrent(key, current ? current : initialPage),
    pageSize: pageSize ? pageSize : initialPageSize,
    setPageSize: (pageSize: number | undefined) =>
      setPageSize(key, pageSize ? pageSize : initialPageSize),
  }
}

export default usePagination
