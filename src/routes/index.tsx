import { createFileRoute } from '@tanstack/react-router'
import Button from '../components/Button'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  return <Button>Hello World!</Button>
}
