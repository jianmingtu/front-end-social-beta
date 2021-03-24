import React, { useState } from 'react'

import OptionMenu from '../OptionMenu'
import styles from './UserComment.module.css'

export default function UserComment({comment, user, submitEditComment, deleteCommentButton}) {
  const [editing, setEditing] = useState(false)

  const editButton = (e) => {
    setEditing(true)
  }

  const cancelEdit = (e) => {
    setEditing(false)
  }

  const handleSubmitEdit = (e) => {
    e.preventDefault()
    submitEditComment({body: {content: e.target.content.value}, commentId: comment._id})
    setEditing(false)
  }

  return (
    <div className={styles.comment}>
      <div className={styles.commentContainer}>
        <img className={styles.avatar} src="https://cdn.discordapp.com/attachments/738356484462608424/816066240917405716/unknown.png" />
        <div className={styles.commentBlock}>
          <span className={styles.commentUser}>
            <p>{comment.user.username}</p>
            {
              !!user ?
                comment.user.id == user.sub ?
                  <OptionMenu editButton={editButton} deleteButton={deleteCommentButton} thisId={comment._id} />
                :
                  <button>Follow</button>
              : null
            }
          </span>
          {
            editing ? 
              <form className={styles.inputForm} onSubmit={handleSubmitEdit}>
                <textarea className={styles.formText} name="content">{comment.content}</textarea>
                <span className={styles.formButton}>
                  <button type="button" onClick={cancelEdit}>Cancel</button>
                  <button type="submit">Comment</button>
                </span>
              </form>
            :
              <p className={styles.commentText}>{comment.content}</p>
          }
        </div>
      </div>
      {/* <span className={styles.likeComment}>
        <span className={styles.buttonCounter}>
          <button>Icon</button>
          <p>0</p>
        </span>
        <span className={styles.buttonCounter}>
          <button>Icon</button>
          <p>1</p>
        </span>
      </span> */}
    </div>
    //If needed add CommentForm component here to for nested comments
    //Add UserComment component if there are any nested comments in data
  )
}
