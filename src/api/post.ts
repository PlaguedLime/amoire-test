import { z } from 'zod'
import { queryOptions } from '@tanstack/react-query'

export const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string()
})

export type PostSchema = z.infer<typeof PostSchema>

export async function getPost(id: number) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  if (!res.ok) {
    if (res.status === 404) throw new Error('Post was not found')
    throw new Error('Failed to fetch post')
  }
  const raw = await res.json()
  if (raw.error) throw new Error(raw.message ?? 'Error fetching post')
  return PostSchema.parse(raw)
}

export function createPostQueryOptions(id: number) {
  return queryOptions({
    queryKey: ['posts', { id }],
    queryFn() {
      return getPost(id)
    }
  })
}
