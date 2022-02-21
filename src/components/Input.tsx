import React, { useState, useRef, useEffect, ChangeEvent } from 'react'

type Props = {
  value: string
  placeholder: string
  className?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default ({ value, placeholder, className, onChange }: Props) => {
  const [width, setWidth] = useState(0)
  const span = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setWidth(span.current?.offsetWidth || 0)
  }, [value])

  return (
    <div>
      <span ref={span} className='hidden-span'>
        {value || placeholder}
      </span>
      <input
        type='text'
        className={className}
        style={{ width }}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}
