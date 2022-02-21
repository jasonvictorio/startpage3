import React, { ChangeEvent } from 'react'

import { Bookmark } from '../types'
import Input from './Input'

type Props = Bookmark & {
  isEdit: boolean,
  onBookmarkChange: (bookmark: Bookmark) => void,
  onBookmarkMoveUp: () => void,
  onBookmarkMoveDown: () => void,
  onBookmarkDelete: () => void,
}

const placeholderTitle = 'title'
const placeholderUrl = 'https://'

export default ({
  title,
  url,
  isEdit,
  onBookmarkChange,
  onBookmarkMoveUp,
  onBookmarkMoveDown,
  onBookmarkDelete
}: Props) => {
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onBookmarkChange({ title: e.target.value, url })
  }

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    onBookmarkChange({ url: e.target.value, title })
  }

  return (
    isEdit ? (
      <div className='bookmark-link'>
        <button type="button" onClick={onBookmarkDelete}>❌</button>
        <button type="button" onClick={onBookmarkMoveUp}>🔼</button>
        <button type="button" onClick={onBookmarkMoveDown}>🔽</button>
        <Input value={title} onChange={handleTitleChange} placeholder={placeholderTitle}></Input>
        <Input value={url} onChange={handleUrlChange} placeholder={placeholderUrl}></Input>
      </div>
    ) : (
      <a href={url} className="bookmark-link" title={url}>{title} <span className="bookmark-link-url">{url}</span></a>
    )
  )
}
