import { z } from 'zod'

export const CommentSchema = z.object({
  id: z.number().int(),
  postId: z.number().int(),
  body: z.string(),
  name: z.string(),
  email: z.string().email()
})

export type CommentSchema = z.infer<typeof CommentSchema>
