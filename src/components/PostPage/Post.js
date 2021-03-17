import React, { useEffect, useState } from 'react'

import OptionMenu from '../OptionMenu'
import styles from './Post.module.css'

export default function Post({post, user, submitEdit, deleteButton}) {
  const [editing, setEditing] = useState(false)

  const editButton = (e) => {
    setEditing(true)
  }

  const cancelEdit = (e) => {
    setEditing(false)
  }

  const handleSubmitEdit = (e) => {
    e.preventDefault()
    submitEdit({body: {content: e.target.content.value}, postId: post._id})
    setEditing(false)
  }

  return (
    <div className={styles.postContainer}>
      <span className={styles.postUser}>
        <span className={styles.user}>
          <img className={styles.avatar} src="https://cdn.discordapp.com/attachments/738356484462608424/816066240917405716/unknown.png" />
          <p>Seal</p>
        </span>
        {
          post.user.id == user.sub ?
            <OptionMenu editButton={editButton} deleteButton={deleteButton} postId={post._id} />
          :
            <button>Follow</button>
        }
      </span>
      <span className={styles.postContent}>
        {
          editing ? 
            <form className={styles.inputForm} onSubmit={handleSubmitEdit}>
              <textarea className={styles.formText} name="content">{post.content}</textarea>
              <span className={styles.formButton}>
                <button type="button" onClick={cancelEdit}>Cancel</button>
                <button type="submit">Post</button>
              </span>
            </form>
          :
            <p>{post.content}</p>
        }
        <img className={styles.postImage} src={post.imageUrl} />
      </span>
      <span className={styles.likeComment}>
        <span className={styles.buttonCounter}>
          <button>Icon</button>
          <p>0</p>
        </span>
        <span className={styles.buttonCounter}>
          <button>Icon</button>
          <p>1</p>
        </span>
      </span>
    </div>
  )
}
