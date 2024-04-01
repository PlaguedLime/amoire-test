import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import { createPortal } from 'react-dom'
import cn from 'src/utilities/cn'

export default function Toaster({
  position = 'bottom-right',
  displayTime = 3000
}: ToasterProps) {
  const [toasts, dispatch] = useReducer(toastReducer, [])
  const timeoutRef = useRef<Record<string, NodeJS.Timeout>>({})

  const dismiss = useCallback((id: string, confirmed?: boolean) => {
    // Clear the timeout if it exists, so that the toast does not try to auto-dismiss during the out animation
    if (timeoutRef.current[id]) clearTimeout(timeoutRef.current[id])
    // Update the toast to start the out animation and add the confirmed flag if provided
    dispatch({ type: 'update', id, data: { direction: 'out', confirmed } })
  }, [])

  const handleStateChange = useCallback(
    (toast: Toast) => {
      const { id, direction } = toast
      switch (direction) {
        case 'in':
          // Do not auto-dismiss confirm toasts
          if (toast.type === 'confirm') return
          // Clear the timeout if it exists before setting a new one
          if (timeoutRef.current[id]) clearTimeout(timeoutRef.current[id])
          // Dismiss the toast after the display time
          timeoutRef.current[id] = setTimeout(dismiss, displayTime, id)
          return
        case 'out':
          // Remove the toast from the state
          dispatch({ type: 'remove', id })
          // Remove the timeout reference
          delete timeoutRef.current[id]
          // Dispatch the dismissed event
          document.dispatchEvent(new ToasterDismissedEvent(toast))
          return
      }
    },
    [displayTime, dismiss]
  )

  useEffect(() => {
    const handleToaster = (event: ToasterEvent) => {
      // Add the toast to the state
      const toast: Toast = { ...event.detail, direction: 'in' }
      dispatch({ type: 'add', toast })
    }
    const handleDismiss = (event: ToasterDismissEvent) => {
      // Dismiss the toast
      dismiss(event.detail.id)
    }

    document.addEventListener('toaster', handleToaster)
    document.addEventListener('toaster-dismiss', handleDismiss)
    return () => {
      document.removeEventListener('toaster', handleToaster)
      document.removeEventListener('toaster-dismiss', handleDismiss)
    }
  }, [dismiss])

  const blockMouseEvents = useMemo(() => {
    // Block mouse events if the first toast is a confirm toast
    return toasts.length > 0 && toasts[0].type === 'confirm'
  }, [toasts])

  return createPortal(
    <div
      className={`fixed z-[999999] inset-0 ${blockMouseEvents ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={cn(
            'absolute',
            PositionStyles[toast.position ?? position],
            AnimationStyles[
              (toast.position ?? position).replace(/.+-/g, '') as ToastAnimation
            ][toast.direction]
          )}
          onAnimationEnd={() => handleStateChange(toast)}
        >
          <div
            className={cn(
              'bg-white border rounded p-2 shadow-md pointer-events-auto max-w-96 m-4 flex flex-col gap-2',
              ToastStyles[toast.type]
            )}
          >
            <div className='flex gap-6 justify-between items-start relative'>
              <p className='flex-1 text-center px-6'>{toast.message}</p>
              {(toast.dismissable ?? true) && (
                <button
                  className='absolute right-0 top-0'
                  onClick={() => dismiss(toast.id)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 text-inherit'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              )}
            </div>
            {toast.type === 'confirm' && (
              <div className='flex justify-between gap-2'>
                <button
                  className='bg-yellow-600 text-inherit px-4 py-1 rounded'
                  onClick={() => dismiss(toast.id, true)}
                >
                  Confirm
                </button>
                <button
                  className='border-yellow-600 border text-inherit px-4 py-1 rounded'
                  onClick={() => dismiss(toast.id, false)}
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>,
    document.body
  )
}

if (import.meta.env.DEV) {
  const toast = (
    type: ToastType,
    message: string,
    position?: ToastPosition,
    dismissable?: boolean
  ) => {
    const id = crypto.randomUUID()
    document.dispatchEvent(
      new ToasterEvent(id, type, message, position, dismissable)
    )
    return () => {
      document.dispatchEvent(new ToasterDismissEvent(id))
    }
  }

  const Window = window as unknown as {
    toast: typeof toast
  }
  Window.toast = toast
}

export class ToasterEvent extends CustomEvent<ToastDetails> {
  constructor(
    id: string,
    type: ToastType,
    message: string,
    position?: ToastPosition,
    dismissable?: boolean
  ) {
    super('toaster', { detail: { id, type, message, position, dismissable } })
  }
}

export class ToasterDismissEvent extends CustomEvent<{ id: string }> {
  constructor(id: string) {
    super('toaster-dismiss', { detail: { id } })
  }
}

export class ToasterDismissedEvent extends CustomEvent<Toast> {
  constructor(toast: Toast) {
    super('toaster-dismissed', { detail: toast })
  }
}

/**
 * The styles for the toasts
 */
const ToastStyles = {
  info: 'bg-blue-500 text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-yellow-500 text-white',
  error: 'bg-red-500 text-white',
  confirm: 'bg-yellow-500 text-white'
}

/**
 * The position styles for the toast
 */
const PositionStyles = {
  'top': 'top-0 left-1/2 -translate-x-1/2',
  'bottom': 'bottom-0 left-1/2 -translate-x-1/2',
  'top-left': 'top-0 left-0',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-right': 'bottom-0 right-0',
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'left': 'top-1/2 left-0 -translate-y-1/2',
  'right': 'top-1/2 right-0 -translate-y-1/2'
}

/**
 * The animation styles for the toast
 */
const AnimationStyles = {
  center: {
    in: 'animate-fade-in',
    out: 'animate-fade-out'
  },
  top: {
    in: 'animate-slide-in-top',
    out: 'animate-slide-out-top'
  },
  bottom: {
    in: 'animate-slide-in-bottom',
    out: 'animate-slide-out-bottom'
  },
  left: {
    in: 'animate-slide-in-left',
    out: 'animate-slide-out-left'
  },
  right: {
    in: 'animate-slide-in-right',
    out: 'animate-slide-out-right'
  }
}

function toastReducer(toasts: Toast[], action: ToastAction) {
  switch (action.type) {
    case 'add':
      // Add the toast to the state and sort the toasts so that confirm toasts are displayed first
      return [...toasts, action.toast].sort(
        (a, b) => +(a.type === 'confirm') - +(b.type === 'confirm')
      )
    case 'remove':
      // Remove the toast with the provided id
      return toasts.filter(toast => toast.id !== action.id)
    case 'update':
      // Update the toast with the provided id
      return toasts.map(toast =>
        toast.id === action.id ? { ...toast, ...action.data } : toast
      )
  }
}

type ToastAction =
  | { type: 'add'; toast: Toast }
  | { type: 'remove'; id: string }
  | { type: 'update'; id: string; data: Partial<Omit<Toast, 'id'>> }

declare global {
  interface DocumentEventMap {
    /**
     * Event fired to display a toast
     */
    'toaster': ToasterEvent
    /**
     * Event fired to dismiss a toast
     */
    'toaster-dismiss': ToasterDismissEvent
    /**
     * Event fired when a toast is dismissed
     */
    'toaster-dismissed': ToasterDismissedEvent
  }
}

export interface ToasterProps {
  /**
   * The position of the toaster
   */
  position?: ToastPosition
  /**
   * The time to display the toast in milliseconds
   */
  displayTime?: number
}

export interface ToastDetails {
  /**
   * The id of the toast
   */
  id: string
  /**
   * The type of the toast
   */
  type: ToastType
  /**
   * The message of the toast
   */
  message: string
  /**
   * The position of the toast
   */
  position?: ToastPosition
  /**
   * Whether the toast is dismissable
   */
  dismissable?: boolean
}

export interface Toast extends ToastDetails {
  direction: 'in' | 'out'
  confirmed?: boolean
}

export type ToastAnimation = keyof typeof AnimationStyles

export type ToastPosition = keyof typeof PositionStyles

export type ToastType = 'info' | 'success' | 'warning' | 'error' | 'confirm'
