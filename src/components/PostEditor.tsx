import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PostSchema, patchPost, postPost } from 'src/api/post'
import Textarea from './Textarea'
import Button from './Button'

export interface PostEditorProps extends Partial<PostSchema> {
  onCancel?(): void
  onDone?(): void
}

export default function PostEditor({
  id,
  title,
  body,
  onCancel,
  onDone
}: PostEditorProps) {
  const [characterCount, setCharacterCount] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)
  const textareaRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()

  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async e => {
      e.preventDefault()
      const form = e.currentTarget
      const data = new FormData(form)
      const title = data.get('title')?.toString()
      const body = data.get('body')?.toString()

      if (id != null) console.log(await patchPost(id, { title, body }))
      else {
        if (!title || !body) return alert('Please fill out all fields')
        console.log(await postPost(1, title, body))
      }

      queryClient.invalidateQueries({ queryKey: ['posts'] })
      form.reset()
      onDoneRef.current?.()
    },
    [id, queryClient]
  )

  useEffect(() => {
    const { current: textarea } = textareaRef
    if (!textarea) return
    setCharacterCount(textarea.innerText.trim().length)
  }, [])

  return (
    <form
      ref={formRef}
      className='border border-gray-400 rounded-xl shadow-md p-4 bg-white'
      onSubmit={handleSubmit}
    >
      <div className='flex flex-row justify-between items-start border-b-2 border-gray-100 mb-2 pb-1'>
        <input
          defaultValue={title}
          name='title'
          type='text'
          className='font-bold text-2xl flex-1 border border-gray-400 rounded-xl shadow-md px-2 py-1 bg-white'
          placeholder='Enter your title...'
        />
      </div>
      <Textarea
        ref={textareaRef}
        defaultValue={body}
        name='body'
        placeholder='Enter your content...'
        maxLength={500}
        formRef={formRef}
        onChange={e => {
          const target = e.target as HTMLDivElement
          setCharacterCount(target.innerText.trim().length)
        }}
      />
      <div className='flex justify-end mt-4 items-center gap-2'>
        {characterCount > 0 && <span>{characterCount} / 500</span>}
        {onCancel && (
          <Button type='button' size='sm' onClick={() => onCancel()}>
            Cancel
          </Button>
        )}
        <Button type='submit' size='sm'>
          {id != null ? 'Save' : 'Post'}
        </Button>
      </div>
    </form>
  )
}
