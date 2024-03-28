import { Link, useRouter } from '@tanstack/react-router'
import cn from 'src/utilities/cn'
import { buttonStyles } from 'src/styles/buttonStyles'
import { type PostSchema } from 'src/api/post'
import Button from './Button'

export interface PostProps extends PostSchema {
  readMore?: boolean
}

export default function Post({ title, id, body, readMore = false }: PostProps) {
  const router = useRouter()

  return (
    <section className='border border-gray-400 rounded-xl shadow-md p-4 bg-white'>
      <div className='flex flex-row justify-between items-start border-b-2 border-gray-100 mb-2 pb-1'>
        <h2
          className={cn(
            'font-bold text-2xl',
            readMore ? 'truncate' : undefined
          )}
        >
          {title}
        </h2>
        {readMore ? (
          <Link
            to={'/posts/$id'}
            params={{ id: id.toString() }}
            className={cn(
              buttonStyles({
                intent: 'secondary',
                size: 'sm',
                className:
                  'shrink-0 border-purple-800 hover:bg-purple-600 hover:text-white hover:border-transparent'
              })
            )}
          >
            Read More
          </Link>
        ) : (
          <Button
            onClick={() => router.history.go(-1)}
            intent='secondary'
            size='sm'
            className='shrink-0 border-purple-800 hover:bg-purple-600 hover:text-white hover:border-transparent'
          >
            Go Back
          </Button>
        )}
      </div>
      <p className={readMore ? 'truncate' : undefined}>{body}</p>
    </section>
  )
}
