import React, { useEffect, useState } from 'react'

import NewPostForm from './NewPostForm'
import styles from './Post.module.css'

export default function Post({submitPost, newPostError}) {
  return (
    <div className={styles.container}>
      <NewPostForm submitPost={submitPost} newPostError={newPostError} />
      <div className={styles.postContainer}>
        <span className={styles.postUser}>
          <span className={styles.user}>
            <img className={styles.avatar} src="https://cdn.discordapp.com/attachments/738356484462608424/816066240917405716/unknown.png" />
            <p>Seal</p>
          </span>
          <button>Options</button>
        </span>
        <span className={styles.postContent}>
          <p>Post Content here</p>
        </span>
        <p>Image</p>
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
    </div>
  )
}
