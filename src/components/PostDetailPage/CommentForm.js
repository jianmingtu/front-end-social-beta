import React, { useEffect, useState } from 'react'

import styles from './CommentForm.module.css'

export default function CommentForm() {
  return (
    <form className={styles.commentForm}>
      <img className={styles.avatar} src="https://cdn.discordapp.com/attachments/738356484462608424/816066240917405716/unknown.png" />
      <input className={styles.commentText} type="text" placeholder="Write a comment..." />
    </form>
  )
}
