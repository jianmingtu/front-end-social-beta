import React, { useEffect, useState } from 'react'

import styles from './Post.module.css'

export default function Post({post}) {
  return (
    <div className={styles.postContainer}>
      <span className={styles.postUser}>
        <span className={styles.user}>
          <img className={styles.avatar} src="https://cdn.discordapp.com/attachments/738356484462608424/816066240917405716/unknown.png" />
          <p>Seal</p>
        </span>
        <button>Options</button>
      </span>
      <span className={styles.postContent}>
        <p>{post.content}</p>
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
