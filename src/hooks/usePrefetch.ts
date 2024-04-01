import {
  type DefaultError,
  type FetchQueryOptions,
  type QueryKey,
  useQueryClient
} from '@tanstack/react-query'
import { useCallback, useRef } from 'react'

/**
 * A hook to prefetch a query
 * @param queryOptions - The query options to prefetch
 * @returns A function to prefetch the query
 */
export default function usePrefetch<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(queryOptions: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
  // Get the query client
  const queryClient = useQueryClient()

  // Store the query options in a ref, so we can access them in the callback without changing the callback's dependencies
  const queryOptionsRef = useRef(queryOptions)
  queryOptionsRef.current = queryOptions

  // Return a callback that prefetches the query
  return useCallback(() => {
    queryClient.prefetchQuery(queryOptionsRef.current)
  }, [queryClient])
}
