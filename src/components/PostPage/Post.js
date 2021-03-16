import React, { useEffect, useState } from 'react'

import OptionMenu from './OptionMenu'
import styles from './Post.module.css'

export default function Post({post, user, editButton, deleteButton}) {
  return (
    <div className={styles.postContainer}>
      <span className={styles.postUser}>
        <span className={styles.user}>
          <img className={styles.avatar} src="https://cdn.discordapp.com/attachments/738356484462608424/816066240917405716/unknown.png" />
          <p>Seal</p>
        </span>
        {
          post.user.id == user.sub ?
            <OptionMenu editButton={editButton} deleteButton={deleteButton} />
          :
            <button>Follow</button>
        }
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
