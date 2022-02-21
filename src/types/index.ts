export interface Bookmark {
  title: string
  url: string
}

export interface BookmarkList {
  title: string
  bookmarks: Bookmark[]
}
