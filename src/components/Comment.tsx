import { CommentSchema } from 'src/api/comment'

export interface CommentProps extends CommentSchema {}

export default function Comment({ name, email, body }: CommentProps) {
  return (
    <section className='border border-gray-400 rounded-xl shadow-md p-4 bg-white'>
      <div className='flex flex-row justify-between items-baseline border-b-2 border-gray-100 mb-2 pb-1'>
        <h3 className='font-bold text-2xl'>{name}</h3>
        <span className='shrink-0'>{email}</span>
      </div>
      <p>{body}</p>
    </section>
  )
}
