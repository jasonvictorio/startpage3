import React, { ChangeEvent } from 'react'

import { Bookmark as BookmarkType, BookmarkList } from '../types'
import Bookmark from './Bookmark'
import Input from './Input'

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
      bookmarks: [...bookmarks, { title: '', url: '' }]
    })
  }

  const handleBookmarkMove = (i: number, bookmark: BookmarkType, direction: 1 | -1) => () => {
    if (i - direction < 0) return;

    bookmarks.splice(i, 1)
    bookmarks.splice(i - direction, 0, bookmark)
    onBookmarkListChange({
      title,
      bookmarks: bookmarks
    })
  }

  const handleBookmarkDelete = (i: number) => () => {
    bookmarks.splice(i, 1)
    onBookmarkListChange({ title, bookmarks })
  }

  return (
    <>
      {isEdit ? (
        <Input value={title} onChange={handleBookmarkListTitleChange} placeholder="List title" className="bookmark-lists-item-title"></Input>
        // <input className="bookmark-lists-item-title" type="text" value={title} onChange={handleBookmarkListTitleChange} />
      ) : (
        <div className="bookmark-lists-item-title">{title}</div>
      )}
      <ul className='bookmark-list'>
        {bookmarks.map((bookmark, i) => (
          <li className="bookmark-list-item" key={i}>
            {bookmark.title !== '' || isEdit ? (
              <Bookmark
                title={bookmark.title}
                url={bookmark.url}
                isEdit={isEdit}
                onBookmarkChange={handleBookmarkChange(i)}
                onBookmarkMoveUp={handleBookmarkMove(i, bookmark, 1)}
                onBookmarkMoveDown={handleBookmarkMove(i, bookmark, -1)}
                onBookmarkDelete={handleBookmarkDelete(i)}
              ></Bookmark>
            ) : (
              <div className="bookmark-list-divider"></div>
            )}
          </li>
        ))}
        {isEdit && <li className='bookmark-list-item'><button className="bookmark-link bookmark-list-add" onClick={handleBookmarkAdd}>add bookmark</button></li>}
      </ul>
    </>
  )
}
