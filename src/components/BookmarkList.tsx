import React, { ChangeEvent } from 'react'

import { Bookmark as BookmarkType, BookmarkList } from '../types'
import Bookmark from './Bookmark'
import Input from './Input'

type Props = BookmarkList & {
  isEdit: boolean
  onBookmarkListChange: (bookmarkList: BookmarkList) => void
  onBookmarkListDelete: () => void
}

export default ({
  title,
  bookmarks,
  isEdit,
  onBookmarkListChange,
  onBookmarkListDelete,
}: Props) => {
  const handleBookmarkChange = (i: number) => (bookmark: BookmarkType) => {
    onBookmarkListChange({
      title,
      bookmarks: [...bookmarks.slice(0, i), bookmark, ...bookmarks.slice(i + 1)],
    })
  }

  const handleBookmarkMove = (i: number, bookmark: BookmarkType, direction: 1 | -1) => () => {
    if (i - direction < 0) return

    bookmarks.splice(i, 1)
    bookmarks.splice(i - direction, 0, bookmark)
    onBookmarkListChange({
      title,
      bookmarks: bookmarks,
    })
  }

  const handleBookmarkDelete = (i: number) => () => {
    bookmarks.splice(i, 1)
    onBookmarkListChange({ title, bookmarks })
  }

  const handleBookmarkListTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onBookmarkListChange({ title: e.target.value, bookmarks })
  }

  const BookmarkAdd = () => {
    const handleBookmarkAdd = () => {
      onBookmarkListChange({
        title,
        bookmarks: [...bookmarks, { title: '', url: '' }],
      })
    }

    return isEdit ? (
      <li className='bookmark-list-item'>
        <button className='bookmark-link bookmark-list-add' onClick={handleBookmarkAdd}>
          add bookmark
        </button>
      </li>
    ) : null
  }

  return (
    <li className='bookmark-lists-item'>
      {isEdit ? (
        <div className='bookmark-lists-item-title'>
          <button type='button' className='icon-font' onClick={onBookmarkListDelete}>
            delete
          </button>
          <Input
            value={title}
            onChange={handleBookmarkListTitleChange}
            placeholder='List title'
          ></Input>
        </div>
      ) : (
        <div className='bookmark-lists-item-title'>{title}</div>
      )}
      <ul className='bookmark-list'>
        {bookmarks.map((bookmark, i) =>
          (!isEdit && bookmark.url === '' && bookmark.title === '') ? (
            <div className='bookmark-list-divider' key={i}></div>
          ) : (
            <Bookmark
              title={bookmark.title}
              url={bookmark.url}
              isEdit={isEdit}
              key={i}
              onBookmarkChange={handleBookmarkChange(i)}
              onBookmarkMoveUp={handleBookmarkMove(i, bookmark, 1)}
              onBookmarkMoveDown={handleBookmarkMove(i, bookmark, -1)}
              onBookmarkDelete={handleBookmarkDelete(i)}
            ></Bookmark>
          )
        )}
        <BookmarkAdd />
      </ul>
    </li>
  )
}
