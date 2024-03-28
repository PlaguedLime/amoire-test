import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { postsQueryOptions } from 'src/api/posts'
import Post from 'src/components/Post'

export const Route = createFileRoute('/posts/')({
  loader({ context: { queryClient } }) {
    return queryClient.ensureQueryData(postsQueryOptions)
  },
  component: Posts
})

function Posts() {
  const posts = useSuspenseQuery(postsQueryOptions)
  return posts.data.map(post => <Post key={post.id} {...post} readMore />)
}
