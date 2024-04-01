import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { postsQueryOptions } from 'src/api/posts'
import Post from 'src/components/Post'
import Button from 'src/components/Button'
import { useState } from 'react'
import PostEditor from 'src/components/PostEditor'

export const Route = createFileRoute('/posts/')({
  loader({ context: { queryClient } }) {
    return queryClient.ensureQueryData(postsQueryOptions)
  },
  component: Posts
})

function Posts() {
  const posts = useSuspenseQuery(postsQueryOptions)
  const [creatingPost, setCreatingPost] = useState(false)

  return (
    <>
      {!creatingPost && (
        <Button onClick={() => setCreatingPost(true)}>Create New Post</Button>
      )}
      {creatingPost && (
        <PostEditor
          onDone={() => setCreatingPost(false)}
          onCancel={() => setCreatingPost(false)}
        />
      )}
      {posts.data.map(post => (
        <Post key={post.id} {...post} readMore />
      ))}
    </>
  )
}
