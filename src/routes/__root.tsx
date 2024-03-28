import { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  Outlet,
  Link,
  ScrollRestoration
} from '@tanstack/react-router'
import NavLink from '../components/NavLink'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  { component: Root }
)

function Root() {
  return (
    <>
      <ScrollRestoration />
      <header className='flex flex-col gap-1 pt-1 sm:flex-row sm:pt-0 justify-center sm:justify-between px-10 bg-purple-800 text-gray-300 items-center sticky top-0 shadow-xl'>
        <h1 className='text-3xl font-bold '>
          <Link to='/'>Armoire Dev</Link>
        </h1>
        <ul className='flex'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/posts'>Posts</NavLink>
          <NavLink to='/about'>About</NavLink>
        </ul>
      </header>
      <main className='px-10'>
        <Outlet />
      </main>
      {import.meta.env.DEV && (
        <>
          <ReactQueryDevtools buttonPosition='top-right' />
          <TanStackRouterDevtools position='bottom-right' />
        </>
      )}
    </>
  )
}
