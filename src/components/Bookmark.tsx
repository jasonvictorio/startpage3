import React from 'react'

import { Bookmark } from '../types'

export default ({ title, url }: Bookmark) => {
  return (
    <a href={url}>{title}</a>
  )
}
