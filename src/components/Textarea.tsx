import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import cn from 'src/utilities/cn'

const Textarea = forwardRef<HTMLDivElement, TextareaProps>(
  (
    {
      className,
      placeholder,
      name,
      maxLength,
      onChange,
      formRef,
      defaultValue
    },
    externalRef
  ) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const defaultValueRef = useRef(defaultValue)
    defaultValueRef.current = defaultValue
    const [showPlaceholder, setShowPlaceholder] = useState(true)

    const reset = useCallback(() => {
      const { current: textarea } = ref
      const { current: input } = inputRef
      if (!textarea || !input) return
      input.value = textarea.innerHTML = '<div><br></div>'
      setShowPlaceholder(true)
    }, [])

    useEffect(() => {
      const defaultValue = defaultValueRef.current ?? '<div><br></div>'
      const { current: textarea } = ref
      const { current: input } = inputRef
      if (!textarea || !input) return
      input.value = textarea.innerHTML = defaultValue
      setShowPlaceholder(textarea.innerText.trim() === '')
    }, [])

    useEffect(() => {
      if (!formRef) return
      const { current: form } = formRef
      if (!form) return

      form.addEventListener('reset', reset)
      return () => {
        form.removeEventListener('reset', reset)
      }
    }, [formRef, reset])

    return (
      <>
        <input ref={inputRef} type='hidden' name={name} />
        <div
          ref={el => {
            ref.current = el
            if (!externalRef) return
            if (typeof externalRef === 'function') return externalRef(el)
            externalRef.current = el
          }}
          data-placeholder={showPlaceholder ? placeholder : undefined}
          className={cn(
            'border border-gray-400 rounded-xl shadow-md px-2 py-1 bg-white textarea',
            className
          )}
          contentEditable
          onInput={e => {
            const target = e.target as HTMLDivElement
            const nativeEvent = e.nativeEvent as InputEvent

            if (nativeEvent.inputType.includes('delete')) {
              if (target.innerHTML === '' || target.innerHTML === '<br>') {
                target.innerHTML = '<div><br></div>'
              }
            }

            setShowPlaceholder(target.innerText.trim() === '')

            onChange?.(e)

            const { current: input } = inputRef
            if (!input) return
            NativeInputValueSetter.call(input, target.innerHTML)
            input.dispatchEvent(new Event('input', { bubbles: true }))
            console.log(input.value, target.innerHTML)
          }}
          onPaste={e => {
            e.preventDefault()
            const target = e.target as HTMLDivElement
            const text = e.clipboardData.getData('text/plain')
            const len = target.innerText.trim().length
            const slicedText = maxLength
              ? text.slice(0, Math.min(maxLength - len, len + text.length))
              : text
            if (slicedText.length === 0) return
            document.execCommand('insertHTML', false, slicedText)
          }}
          onKeyDown={e => {
            const target = e.target as HTMLDivElement
            if (maxLength && target.innerText.trim().length >= maxLength) {
              if (
                e.ctrlKey ||
                e.altKey ||
                e.metaKey ||
                AllowedKeys.includes(e.key)
              )
                return
              e.preventDefault()
            }
          }}
        />
      </>
    )
  }
)

const NativeInputValueSetter = Object.getOwnPropertyDescriptor(
  HTMLInputElement.prototype,
  'value'
)!.set!

const AllowedKeys = [
  'Backspace',
  'Delete',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown'
]

Textarea.displayName = 'Textarea'

export default Textarea

export interface TextareaProps {
  className?: string
  placeholder?: string
  name?: string
  maxLength?: number
  onChange?: React.FormEventHandler<HTMLDivElement>
  formRef?: React.MutableRefObject<HTMLFormElement | null>
  defaultValue?: string
}
