import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense, useState } from 'react'
import { createCommentsQueryOptions } from 'src/api/comments'
import { createPostQueryOptions } from 'src/api/post'
import Button from 'src/components/Button'
import Comments from 'src/components/Comments'
import Post from 'src/components/Post'

export const Route = createFileRoute('/posts/$id')({
  loader({ context: { queryClient }, params: { id } }) {
    return queryClient.ensureQueryData(createPostQueryOptions(parseInt(id)))
  },
  component: PostPage
})

function PostPage() {
  const post = Route.useLoaderData()
  const [showComments, setShowComments] = useState(false)
  const queryClient = useQueryClient()

  const prefetchComments = () => {
    queryClient.prefetchQuery(createCommentsQueryOptions(post.id))
  }

  return (
    <>
      <Post {...post} />
      <Button size='sm' onMouseEnter={prefetchComments} onFocus={prefetchComments} onClick={() => setShowComments(c => !c)}>
        {showComments ? 'Hide' : 'Show'} Comments
      </Button>
      {showComments && (
        <Suspense fallback={<>Loading...</>}>
          <Comments postId={post.id} />
        </Suspense>
      )}
    </>
  )
}



