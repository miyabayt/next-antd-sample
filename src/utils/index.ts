export const fetcher = async (
  resource: RequestInfo,
  init?: RequestInit,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const response = await fetch(resource, init)
  const data = await response.json()

  if (response.ok) {
    return data
  }

  const errorBody = await response.json()
  throw new Error(errorBody.message ?? `failed to fetch. [path=${resource}]`)
}
