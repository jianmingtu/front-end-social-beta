import React, { useEffect, useState } from 'react'

import styles from './NewPostForm.module.css'

export default function NewPostForm({submitPost, newPostError}) {
  const [showFileInput, setShowFileInput] = useState(false)

  const handleImage = (e) => {
    setShowFileInput(!showFileInput)
  }

  const handleNewPost = (e) => {
    e.preventDefault()
    submitPost({content: e.target.content.value, imageFile: e.target.imageFile})
    e.target.content.value = ""
    if(e.target.imageFile)
      e.target.imageFile.value = ""
  }

  return (
    <div className={styles.container}>
      <img className={styles.avatar} src="https://cdn.discordapp.com/attachments/738356484462608424/816066240917405716/unknown.png" />
      <form className={styles.inputForm} onSubmit={handleNewPost}>
        <textarea className={styles.formText} name="content" placeholder="What's happening?" />
        <span className={styles.formButton}>
          <button type="button" onClick={handleImage}>Image</button>
          <button type="submit">Post</button>
        </span>
        { 
          showFileInput ?
            <input name="imageFile" type="file" accept="image/*" />
          : null
        }
        {!!newPostError && <p>{newPostError}</p>}
      </form>

    </div>
  )
}
