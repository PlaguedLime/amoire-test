import { createFileRoute } from '@tanstack/react-router'
import Button from '../components/Button'
import useToaster from 'src/hooks/useToaster'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  const toast = useToaster(toast => {
    alert(
      `Toast dismissed: ${toast.message} ${toast.confirmed ? 'confirmed' : 'dismissed'}`
    )
  })

  return (
    <Button onClick={() => toast('confirm', 'Hello World!')}>
      Hello World!
    </Button>
  )
}
