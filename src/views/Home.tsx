import React, { useEffect, useState } from 'react'
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

  return (
    <div>
      {bookmarkLists.map(({ title, bookmarks }, i) => (
        <BookmarkList
          title={title}
          bookmarks={bookmarks}
          isEdit={isEdit}
          onBookmarkListChange={handleBookmarkListChange(i)}
          key={i}
        ></BookmarkList>
      ))}

      {isEdit ? (
        <>
          <button onClick={handleBookmarkListAdd}>add bookmark list</button>
          <button onClick={handleCancel}>cancel</button>
          <button onClick={handleSave}>save</button>
        </>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  )
}
