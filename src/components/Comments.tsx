import { useSuspenseQuery } from "@tanstack/react-query"
import { createCommentsQueryOptions } from "src/api/comments"
import Comment from "./Comment"

export interface CommentsProps {
  postId?: number
}

export default function Comments({ postId }: CommentsProps) {
  const query = useSuspenseQuery(createCommentsQueryOptions(postId))
  return query.data.map(comment => <Comment key={comment.id} {...comment} />)
}