import { z } from 'zod'
import { PostSchema } from './post'
import { queryOptions } from '@tanstack/react-query'

export const PostsSchema = z.array(PostSchema)

export type PostsSchema = z.infer<typeof PostsSchema>

export async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!res.ok) {
    if (res.status === 404) throw new Error('Posts were not found')
    throw new Error('Failed to fetch posts')
  }
  const raw = await res.json()
  if (raw.error) throw new Error(raw.message ?? 'Error fetching posts')
  return PostsSchema.parse(raw)
}

export const postsQueryOptions = queryOptions({
  queryKey: ['posts'],
  queryFn: getPosts
})
