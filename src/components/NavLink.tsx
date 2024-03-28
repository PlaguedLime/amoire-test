import cn from '../utilities/cn'
import { useMemo } from 'react'
import { Link, type LinkComponent } from '@tanstack/react-router'

type LinkProps = Parameters<LinkComponent<'a'>>['0']

export default function NavLink({
  className,
  activeProps,
  ...props
}: LinkProps) {
  const _activeProps = useMemo(() => {
    if (typeof activeProps === 'function') return activeProps()
    return activeProps
  }, [activeProps])

  return (
    <li>
      <Link
        className={cn(
          'transition-colors px-6 py-2 hover:bg-white/30 block font-semibold',
          className
        )}
        activeProps={{
          className: cn('bg-white/10', _activeProps?.className),
          ..._activeProps
        }}
        {...props}
      />
    </li>
  )
}
