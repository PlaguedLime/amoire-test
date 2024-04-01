import { z } from 'zod'

export const CommentSchema = z.object({
  /**
   * The ID of the comment
   */
  id: z.number().int(),
  /**
   * The ID of the post the comment belongs to
   */
  postId: z.number().int(),
  /**
   * The body of the comment
   */
  body: z.string(),
  /**
   * The name of the commenter
   */
  name: z.string(),
  /**
   * The email of the commenter
   */
  email: z.string().email()
})

export type CommentSchema = z.infer<typeof CommentSchema>
