import React from 'react'

import { BookmarkList } from '../types'
import Bookmark from './Bookmark'

export default ({ title, bookmarks }: BookmarkList) => {
  return (
    <ul>
      <li>{title}</li>
      {bookmarks.map(({ title, url }) => (
        <li>
          <Bookmark
            title={title}
            url={url}
            key={url}
          ></Bookmark>
        </li>
      ))}
    </ul>
  )
}
