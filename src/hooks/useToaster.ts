import { useCallback, useEffect, useRef } from 'react'
import {
  type ToastPosition,
  type ToastType,
  ToasterEvent,
  ToasterDismissEvent,
  Toast,
  ToasterDismissedEvent
} from 'src/components/Toaster'

export default function useToaster(onDismissal?: (toast: Toast) => void) {
  const managedToastsRef = useRef<string[]>([])
  const onDismissalRef = useRef(onDismissal)
  onDismissalRef.current = onDismissal

  const toast = useCallback(
    (
      type: ToastType,
      message: string,
      position?: ToastPosition,
      dismissable?: boolean
    ) => {
      const id = crypto.randomUUID()
      document.dispatchEvent(
        new ToasterEvent(id, type, message, position, dismissable)
      )
      managedToastsRef.current.push(id)
      return () => {
        document.dispatchEvent(new ToasterDismissEvent(id))
      }
    },
    []
  )

  useEffect(() => {
    const handleDismissed = (event: ToasterDismissedEvent) => {
      if (!managedToastsRef.current.includes(event.detail.id)) return
      managedToastsRef.current = managedToastsRef.current.filter(
        id => id !== event.detail.id
      )
      if (onDismissalRef.current) onDismissalRef.current(event.detail)
    }
    document.addEventListener('toaster-dismissed', handleDismissed)
    return () => {
      document.removeEventListener('toaster-dismissed', handleDismissed)
    }
  }, [onDismissal])

  return toast
}
