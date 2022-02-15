import React from 'react'
import { RouteComponentProps } from '@reach/router'

import BookmarkList from '../components/BookmarkList'
import { BookmarkList as BookmarkListType } from '../types'

export default (props: RouteComponentProps) => {
  const bookmarkLists: BookmarkListType[] = [
    {
      title: 'first',
      bookmarks: [
        { title: 'Google1', url: 'https://www.google.com' },
        { title: 'Google2', url: 'https://www.google.com' },
        { title: 'Google3', url: 'https://www.google.com' },
        { title: 'Google4', url: 'https://www.google.com' },
        { title: 'Google5', url: 'https://www.google.com' },
        { title: 'Google6', url: 'https://www.google.com' },
        { title: 'Google7', url: 'https://www.google.com' },
      ],
    },
    {
      title: 'second',
      bookmarks: [
        { title: 'Google1', url: 'https://www.google.com' },
        { title: 'Google2', url: 'https://www.google.com' },
        { title: 'Google3', url: 'https://www.google.com' },
        { title: 'Google4', url: 'https://www.google.com' },
        { title: 'Google5', url: 'https://www.google.com' },
        { title: 'Google6', url: 'https://www.google.com' },
        { title: 'Google7', url: 'https://www.google.com' },
      ],
    },
  ]

  return (
    <div>
      {bookmarkLists.map(({ title, bookmarks }) => (
        <BookmarkList
          title={title}
          bookmarks={bookmarks}
          key={title}
        ></BookmarkList>
      ))}
    </div>
  )
}
