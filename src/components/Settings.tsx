import React from 'react'

import ImageUpload from './ImageUpload'

const labels = {
  settings: 'Settings',
  addBookmark: 'Add bookmark list',
  changeBackground: 'Change background',
  save: 'Save',
  cancel: 'Cancel',
  edit: 'Edit',
}

type Props = {
  isEdit: boolean
  handleBookmarkListAdd: React.MouseEventHandler
  handleSave: React.MouseEventHandler
  handleCancel: React.MouseEventHandler
  handleEdit: React.MouseEventHandler
  handleImageChange: (e: string) => void
}

export default ({
  isEdit,
  handleBookmarkListAdd,
  handleImageChange,
  handleSave,
  handleCancel,
  handleEdit,
}: Props) => {
  return (
    <li className={`bookmark-lists-item settings-dropdown ${isEdit ? 'active' : ''}`}>
      <div className='bookmark-lists-item-title'>{labels.settings}</div>
      <ul className='bookmark-list'>
        {isEdit ? (
          <>
            <li className='bookmark-list-item'>
              <button className='bookmark-link' onClick={handleBookmarkListAdd}>
                {labels.addBookmark}
              </button>
            </li>
            <li className='bookmark-list-item'>
              <ImageUpload
                label={labels.changeBackground}
                className='bookmark-link'
                onChange={handleImageChange}
              ></ImageUpload>
            </li>
            <div className='bookmark-list-divider'></div>
            <li className='bookmark-list-item'>
              <button className='bookmark-link' onClick={handleSave}>
                {labels.save}
              </button>
            </li>
            <li className='bookmark-list-item'>
              <button className='bookmark-link' onClick={handleCancel}>
                {labels.cancel}
              </button>
            </li>
          </>
        ) : (
          <li className='bookmark-list-item'>
            <button className='bookmark-link' onClick={handleEdit}>
              {labels.edit}
            </button>
          </li>
        )}
      </ul>
    </li>
  )
}
