import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { type VariantProps } from 'class-variance-authority'
import cn from '../utilities/cn'
import { buttonStyles } from '../styles/buttonStyles'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {}

/**
 * A button component.
 * @source
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonStyles({ intent, size, className }))}
      {...props}
    />
  )
)

Button.displayName = 'Button'

export default Button
