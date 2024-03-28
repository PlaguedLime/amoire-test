import { clsx, ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * A utility function to merge Tailwind CSS classes with other classes.
 * @param classes - The classes to merge.
 * @returns The merged classes.
 * @example
 * ```tsx
 * const classes = cn('text-red-500', 'bg-blue-500', 'p-4', 'rounded-lg') // 'text-red-500 bg-blue-500 p-4 rounded-lg'
 * return <div className={classes}>Hello, world!</div>
 * ```
 */
export default function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes))
}
