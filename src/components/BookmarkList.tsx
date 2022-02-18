import React, { ChangeEvent } from 'react'

import { Bookmark as BookmarkType, BookmarkList } from '../types'
import Bookmark from './Bookmark'

type Props = BookmarkList & {
  isEdit: boolean,
  onBookmarkListChange: (bookmarkList: BookmarkList) => void,
}

export default ({ title, bookmarks, isEdit, onBookmarkListChange }: Props) => {
  const handleBookmarkListTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onBookmarkListChange({ title: e.target.value, bookmarks })
  }

  const handleBookmarkChange = (i: number) => (bookmark: BookmarkType) => {

    onBookmarkListChange({
      title,
      bookmarks: [
        ...bookmarks.slice(0, i),
        bookmark,
        ...bookmarks.slice(i + 1)
      ]
    })
  }

  const handleBookmarkAdd = () => {
    onBookmarkListChange({
      title,
      bookmarks: [...bookmarks, {}]
    })
  }

  const handleBookmarkMove = (i: number, bookmark: BookmarkType, direction: 1 | -1) => () => {
    if (i - direction <= 0) return;

    bookmarks.splice(i, 1)
    bookmarks.splice(i - direction, 0, bookmark)
    onBookmarkListChange({
      title,
      bookmarks: bookmarks
    })
  }

  return (
    <ul>
      {isEdit ? (
        <input type="text" value={title} onChange={handleBookmarkListTitleChange} />
      ) : (
        <li>{title}</li>
      )}
      {bookmarks.map((bookmark, i) => (
        <li key={i}>
          <Bookmark
            title={bookmark.title}
            url={bookmark.url}
            isEdit={isEdit}
            onBookmarkChange={handleBookmarkChange(i)}
            onBookmarkMoveUp={handleBookmarkMove(i, bookmark, 1)}
            onBookmarkMoveDown={handleBookmarkMove(i, bookmark, -1)}
          ></Bookmark>
        </li>
      ))}
      {isEdit && <li><button onClick={handleBookmarkAdd}>add bookmark</button></li>}
    </ul>
  )
}
