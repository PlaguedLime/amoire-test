import { z } from 'zod'
import { queryOptions } from '@tanstack/react-query'
import { get } from 'src/utilities/request'

export const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string()
})

export type PostSchema = z.infer<typeof PostSchema>

export function getPost(id: number) {
  return get(
    'post',
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    PostSchema
  )
}

export function createPostQueryOptions(id: number) {
  return queryOptions({
    queryKey: ['posts', { id }],
    queryFn() {
      return getPost(id)
    }
  })
}
