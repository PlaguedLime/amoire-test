import { z } from 'zod'
import { PostSchema } from './post'
import { queryOptions } from '@tanstack/react-query'
import { get } from 'src/utilities/request'

export const PostsSchema = z.array(PostSchema)

export type PostsSchema = z.infer<typeof PostsSchema>

export function getPosts() {
  return get('posts', 'https://jsonplaceholder.typicode.com/posts', PostsSchema)
}

export const postsQueryOptions = queryOptions({
  queryKey: ['posts'],
  queryFn: getPosts
})
