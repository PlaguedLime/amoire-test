import { z } from 'zod'
import { queryOptions } from '@tanstack/react-query'
import { del, get, patch, post } from 'src/utilities/request'

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

export function postPost(userId: number, title: string, body: string) {
  return post(
    'post',
    `https://jsonplaceholder.typicode.com/posts`,
    { userId, title, body },
    PostSchema
  )
}

export function patchPost(
  id: number,
  data: Partial<Omit<PostSchema, 'id'>> = {}
) {
  return patch(
    'post',
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    data,
    PostSchema
  )
}

export function putPost(
  id: number,
  userId: number,
  title: string,
  body: string
) {
  return patch(
    'post',
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    { userId, title, body },
    PostSchema
  )
}

export function deletePost(id: number) {
  return del('post', `https://jsonplaceholder.typicode.com/posts/${id}`)
}

export function createPostQueryOptions(id: number) {
  return queryOptions({
    queryKey: ['posts', { id }],
    queryFn() {
      return getPost(id)
    }
  })
}
