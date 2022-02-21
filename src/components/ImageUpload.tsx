import React, { ChangeEvent } from 'react'

type Props = {
  label: string,
  className?: string,
  onChange: (e: string) => void,
}

export default ({ label, className, onChange }: Props) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files?.length < 0) return
    const fileToLoad = files[0];
    const fileReader = new FileReader();

    fileReader.onload = (fileLoadedEvent: ProgressEvent<FileReader>) => {
      const srcData = fileLoadedEvent.target?.result
      if (typeof srcData !== 'string') return
      onChange(srcData)
    }

    fileReader.readAsDataURL(fileToLoad);
  }

  return (
    <label className={`input-file ${className ? className : ''}`}>
      <input type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleImageChange}
      />
      {label}
    </label>
  );
};
