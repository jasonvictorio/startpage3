import React, { ChangeEvent } from 'react'

import { Bookmark } from '../types'

type Props = Bookmark & {
  isEdit: boolean,
  onBookmarkChange: (bookmark: Bookmark) => void,
  onBookmarkMoveUp: () => void,
  onBookmarkMoveDown: () => void,
}

const placeholderTitle = 'title'
const placeholderUrl = 'https://'

export default ({ title, url, isEdit, onBookmarkChange, onBookmarkMoveUp, onBookmarkMoveDown }: Props) => {
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onBookmarkChange({ title: e.target.value, url })
  }

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    onBookmarkChange({ url: e.target.value, title })
  }

  return (
    isEdit ? (
      <>
        <input type="text" value={title} onChange={handleTitleChange} placeholder={placeholderTitle} />
        <input type="text" value={url} onChange={handleUrlChange} placeholder={placeholderUrl} />
        <button type="button" onClick={onBookmarkMoveUp}>up</button>
        <button type="button" onClick={onBookmarkMoveDown}>down</button>
      </>
    ) : (
      <a href={url}>{title}</a>
    )
  )
}
