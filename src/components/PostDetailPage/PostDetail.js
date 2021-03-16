import React, { useEffect, useState } from 'react'

import UserComment from './UserComment'
import CommentForm from './CommentForm'
import styles from './PostDetail.module.css'

export default function PostDetail({post, comments}) {
  return (
    <div className={styles.container}>
      {console.log(post)}
      {
        post && post.imageUrl ?
          <div className={styles.imageContainer}>
            <img className={styles.image} src={post.imageUrl} />
          </div>
        :
          <span></span>
      }
      {
        post ?
          <div className={post.imageUrl ? styles.detailContainer : styles.detailFull}>
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
            <span className={styles.commentContainer}>
              <CommentForm /> {/* This form will handle comment to the post */}
              <UserComment />
            </span>
          </div>
        :
          <p>404 Post Not Found</p>
      }
    </div>
  )
}
