import { createFileRoute } from '@tanstack/react-router'
import { createPostQueryOptions } from 'src/api/post'
import Post from 'src/components/Post'

export const Route = createFileRoute('/posts/$id')({
  loader({ context: { queryClient }, params: { id } }) {
    return queryClient.ensureQueryData(createPostQueryOptions(parseInt(id)))
  },
  component: PostPage
})

function PostPage() {
  const post = Route.useLoaderData()
  return <Post {...post} />
}
