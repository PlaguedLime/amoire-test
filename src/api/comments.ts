import { z } from 'zod'
import { CommentSchema } from './comment'
import { queryOptions } from '@tanstack/react-query'

export const CommentsSchema = z.array(CommentSchema)

export type CommentsSchema = z.infer<typeof CommentsSchema>

export async function getComments(postId?: number) {
  const url = new URL('https://jsonplaceholder.typicode.com/comments')
  if (postId) url.searchParams.set('postId', postId.toString())
  const res = await fetch(url)
  if (!res.ok) {
    if (res.status === 404) throw new Error('Comments were not found')
    throw new Error('Failed to fetch comments')
  }
  const raw = await res.json()
  if (raw.error) throw new Error(raw.message ?? 'Error fetching comments')
  return CommentsSchema.parse(raw)
}
export function createCommentsQueryOptions(id?: number) {
  const queryKey: (string | { id: number })[] = ['comments']
  if (typeof id !== 'undefined') queryKey.push({ id })
  return queryOptions({
    queryKey,
    queryFn() {
      return getComments(id)
    }
  })
}
