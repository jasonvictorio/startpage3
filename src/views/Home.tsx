import React, { useEffect, useState } from 'react'
import _ from 'lodash'

import BookmarkList from '../components/BookmarkList'
import { BookmarkList as BookmarkListType } from '../types'
import ImageUpload from '../components/ImageUpload'
import defaultBookmarkLists from '../bookmarkLists'
import defaultBackground from '../background'
import Settings from '../components/Settings'

const bookmarkListsKey = 'bookmark-lists'
const backgroundKey = 'background'

export default () => {
  const [isEdit, setEdit] = useState(false)
  const [bookmarkLists, setBookmarkLists] = useState<BookmarkListType[]>([])
  const [bookmarkListsCopy, setBookmarkListsCopy] = useState<BookmarkListType[]>([])
  const [background, setBackground] = useState('')

  useEffect(() => {
    if (localStorage.getItem(bookmarkListsKey) === null) {
      localStorage.setItem(bookmarkListsKey, JSON.stringify(defaultBookmarkLists))
    }
    setBookmarkLists(JSON.parse(localStorage.getItem(bookmarkListsKey) || ''))
  }, [])

  useEffect(() => {
    if (localStorage.getItem(backgroundKey) === null) {
      localStorage.setItem(backgroundKey, defaultBackground)
    }
    setBackground(localStorage.getItem(backgroundKey) || '')
  }, [])

  const handleBookmarkListChange = (i: number) => (bookmarkList: BookmarkListType) => {
    setBookmarkLists([...bookmarkLists.slice(0, i), bookmarkList, ...bookmarkLists.slice(i + 1)])
  }

  const handleBookmarkListDelete = (i: number) => () => {
    setBookmarkLists(bookmarkLists.filter((a, b) => i !== b))
  }

  const handleBookmarkListAdd = () => {
    const newBookmarkList = { title: '', bookmarks: [{ title: '', url: '' }] }
    setBookmarkLists([...bookmarkLists, newBookmarkList])
  }

  const handleEdit = () => {
    setBookmarkListsCopy(_.cloneDeep(bookmarkLists))
    setEdit(true)
  }

  const handleSave = () => {
    localStorage.setItem(bookmarkListsKey, JSON.stringify(bookmarkLists))
    localStorage.setItem(backgroundKey, background)
    setBookmarkListsCopy([])
    setEdit(false)
  }

  const handleCancel = () => {
    setBookmarkLists(bookmarkListsCopy)
    setBackground(localStorage.getItem(backgroundKey) || '')
    setBookmarkListsCopy([])
    setEdit(false)
  }

  const handleImageChange = (e: string) => {
    setBackground(e)
  }

  return (
    <nav className='home' style={{ backgroundImage: `url(${background})` }}>
      <ul className='bookmark-lists'>
        {bookmarkLists.map(({ title, bookmarks }, i) => (
          <BookmarkList
            title={title}
            bookmarks={bookmarks}
            isEdit={isEdit}
            key={i}
            onBookmarkListChange={handleBookmarkListChange(i)}
            onBookmarkListDelete={handleBookmarkListDelete(i)}
          />
        ))}
        <Settings
          {...{
            isEdit,
            handleBookmarkListAdd,
            handleSave,
            handleCancel,
            handleEdit,
            handleImageChange,
          }}
        />
      </ul>
    </nav>
  )
}
