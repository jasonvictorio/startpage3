import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'

import BookmarkList from '../components/BookmarkList'
import defaultBookmarkLists from '../bookmarkLists'
import { BookmarkList as BookmarkListType } from '../types'

export default (props: RouteComponentProps) => {
  const [bookmarkLists, setBookmarkLists] = useState(defaultBookmarkLists);


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
