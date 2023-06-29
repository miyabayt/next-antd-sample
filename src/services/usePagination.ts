import usePaginationStore from '@/stores/usePaginationStore'

const usePagination = (key: string, initialPageSize = 20) => {
  const { getPageSize, setPageSize } = usePaginationStore((state) => state)
  const pageSize = getPageSize(key)

  return {
    pageSize: pageSize ? pageSize : initialPageSize,
    setPageSize: (pageSize: number | undefined) =>
      setPageSize(key, pageSize ? pageSize : initialPageSize),
  }
}

export default usePagination
