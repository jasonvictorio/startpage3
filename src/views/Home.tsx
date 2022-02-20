import React, { ChangeEvent, useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import _ from 'lodash'

import BookmarkList from '../components/BookmarkList'
import defaultBookmarkLists from '../bookmarkLists'
import { BookmarkList as BookmarkListType } from '../types'

const bookmarkListsKey = 'bookmark-lists'

export default (props: RouteComponentProps) => {
  const [isEdit, setEdit] = useState(false)
  const [bookmarkLists, setBookmarkLists] = useState<BookmarkListType[]>([])
  const [bookmarkListsCopy, setBookmarkListsCopy] = useState<BookmarkListType[]>([])

  useEffect(() => {
    if (localStorage.getItem(bookmarkListsKey) === null) {
      localStorage.setItem(bookmarkListsKey, JSON.stringify(defaultBookmarkLists))
    }
    setBookmarkLists(JSON.parse(localStorage.getItem(bookmarkListsKey) || ''))
  }, [])

  const handleBookmarkListChange = (i: number) => (bookmarkList: BookmarkListType) => {
    setBookmarkLists([
      ...bookmarkLists.slice(0, i),
      bookmarkList,
      ...bookmarkLists.slice(i + 1),
    ])
  }

  const handleBookmarkListAdd = () => {
    setBookmarkLists([...bookmarkLists, { title: '', bookmarks: [{}] }])
  }

  const handleEdit = () => {
    setBookmarkListsCopy(_.cloneDeep(bookmarkLists))
    setEdit(true)
  }

  const handleSave = () => {
    localStorage.setItem(bookmarkListsKey, JSON.stringify(bookmarkLists))
    setBookmarkListsCopy([])
    setEdit(false)
  }

  const handleCancel = () => {
    setBookmarkLists(bookmarkListsCopy)
    setBookmarkListsCopy([])
    setEdit(false)
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  }

  return (
    <div>
      <ul className='bookmark-lists'>
        {bookmarkLists.map(({ title, bookmarks }, i) => (
          <li key={i} className="bookmark-lists-item">
            <BookmarkList
              title={title}
              bookmarks={bookmarks}
              isEdit={isEdit}
              onBookmarkListChange={handleBookmarkListChange(i)}
            ></BookmarkList>
          </li>
        ))}
        <li className='bookmark-lists-item settings-dropdown'>
          <div className="bookmark-lists-item-title">⚙️</div>
          <ul className="bookmark-list">
            {isEdit ? (
              <>
                <li className='bookmark-list-item'>
                  <button className='bookmark-link' onClick={handleBookmarkListAdd}>add bookmark list</button>
                </li>
                <li className='bookmark-list-item'>
                  <button className='bookmark-link' onClick={handleCancel}>cancel</button>
                </li>
                <li className='bookmark-list-item'>
                  <button className='bookmark-link' onClick={handleSave}>save</button>
                </li>
                <li className='bookmark-list-item'>
                  <input className='bookmark-link' type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageChange} />
                </li>
              </>
            ) : (
              <li className='bookmark-list-item'>
                <button className='bookmark-link' onClick={handleEdit}>Edit</button>
              </li>
            )}
          </ul>
        </li>
      </ul>

    </div>
  )
}
