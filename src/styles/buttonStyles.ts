import { cva } from 'class-variance-authority'

export const buttonStyles = cva('transition-colors rounded-lg border', {
  variants: {
    intent: {
      primary: 'bg-blue-500 text-white border-transparent hover:bg-blue-600',
      secondary: 'bg-white text-gray-800 border-gray-400 hover:bg-gray-100'
    },
    size: {
      sm: 'px-2.5 py-1.5 text-xs',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-2.5 text-base'
    }
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md'
  }
})
