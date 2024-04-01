import { createFileRoute } from '@tanstack/react-router'
import { Suspense, useMemo, useState } from 'react'
import { createCommentsQueryOptions } from 'src/api/comments'
import { createPostQueryOptions } from 'src/api/post'
import Button from 'src/components/Button'
import Comments from 'src/components/Comments'
import Post from 'src/components/Post'
import usePrefetch from 'src/hooks/usePrefetch'

export const Route = createFileRoute('/posts/$id')({
  loader({ context: { queryClient }, params: { id } }) {
    return queryClient.ensureQueryData(createPostQueryOptions(parseInt(id)))
  },
  component: PostPage
})

function PostPage() {
  // Get the post from the loader data
  const post = Route.useLoaderData()

  // State to show/hide comments
  const [showComments, setShowComments] = useState(false)

  // Create the prefetch options for the comments query
  const prefetchCommentsOptions = useMemo(
    () => createCommentsQueryOptions(post.id),
    [post.id]
  )

  // Prefetch the comments query when the button is hovered or focused
  const prefetchComments = usePrefetch(prefetchCommentsOptions)

  return (
    <>
      <Post {...post} />
      <Button
        size='sm'
        onMouseEnter={prefetchComments}
        onFocus={prefetchComments}
        onClick={() => setShowComments(c => !c)}
      >
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
