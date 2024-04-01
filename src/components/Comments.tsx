import { useSuspenseQuery } from '@tanstack/react-query'
import { createCommentsQueryOptions } from 'src/api/comments'
import Comment from './Comment'

export interface CommentsProps {
  /**
   * The post ID to fetch comments for
   */
  postId?: number
}

/**
 * Fetches and renders comments, optionally for a specific post
 * @param props - The props for the component
 * @returns The comments
 */
export default function Comments({ postId }: CommentsProps) {
  const query = useSuspenseQuery(createCommentsQueryOptions(postId))
  return query.data.map(comment => <Comment key={comment.id} {...comment} />)
}
