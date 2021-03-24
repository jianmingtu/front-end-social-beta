import React from 'react'

import styles from './CommentForm.module.css'

export default function CommentForm({submitComment}) {
  const handleNewComment = (e) => {
    e.preventDefault()
    submitComment({content: e.target.content.value})
    e.target.content.value = ""
  }

  return (
    <form className={styles.commentForm} onSubmit={handleNewComment}>
      <img className={styles.avatar} src="https://cdn.discordapp.com/attachments/738356484462608424/816066240917405716/unknown.png" />
      <input className={styles.commentText} name="content" type="text" placeholder="Write a comment..." />
    </form>
  )
}
