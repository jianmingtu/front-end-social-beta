import React, { useEffect, useState } from 'react'

import styles from './UserComment.module.css'

export default function UserComment({comment, user}) {
  return (
    <div className={styles.comment}>
      <div className={styles.commentContainer}>
        <img className={styles.avatar} src="https://cdn.discordapp.com/attachments/738356484462608424/816066240917405716/unknown.png" />
        <div className={styles.commentBlock}>
          <p>User</p>
          <p className={styles.commentText}>{comment.content}</p>
        </div>
      </div>
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
    //If needed add CommentForm component here to for nested comments
    //Add UserComment component if there are any nested comments in data
  )
}
