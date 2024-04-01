import { z } from 'zod'
import { CommentSchema } from './comment'
import { queryOptions } from '@tanstack/react-query'
import { get } from 'src/utilities/request'

export const CommentsSchema = z.array(CommentSchema)

export type CommentsSchema = z.infer<typeof CommentsSchema>

export async function getComments(postId?: number) {
  const url = new URL('https://jsonplaceholder.typicode.com/comments')
  if (postId) url.searchParams.set('postId', postId.toString())
  return get('comments', url, CommentsSchema)
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
