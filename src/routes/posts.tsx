import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/posts')({
  component: Posts
})

function Posts() {
  return (
    <div className='flex flex-col gap-6 mx-auto py-6 sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%] xl:max-w-[40%]'>
      <Outlet />
    </div>
  )
}
