import React, { useEffect, useState } from 'react'

import NewPostForm from './NewPostForm'
import styles from './Post.module.css'

export default function Post() {
  return (
    <div className={styles.container}>
      <NewPostForm />
      <div className={styles.postContainer}>
        <span className={styles.postUser}>
          <span className={styles.user}>
            <img className={styles.avatar} src="https://cdn.discordapp.com/attachments/738356484462608424/816066240917405716/unknown.png" />
            <p>Seal</p>
          </span>
          <button>Options</button>
        </span>
        <p>Post Content here</p>
        <p>Image</p>
      </div>
    </div>
  )
}
