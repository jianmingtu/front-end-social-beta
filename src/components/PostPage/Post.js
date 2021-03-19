import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import OptionMenu from '../OptionMenu'
import styles from './Post.module.css'

export default function Post({post, user, likePost, submitEdit, deleteButton}) {
  const [editing, setEditing] = useState(false)

  const history = useHistory()

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

  const toDetail = (data) => {
    history.push(`/post/${post._id}`)
  }

  return (
    <div className={styles.postContainer} >
      <span className={styles.postUser}>
        <span className={styles.user}>
          <img className={styles.avatar} src="https://cdn.discordapp.com/attachments/738356484462608424/816066240917405716/unknown.png" />
          <p>{post.user.username}</p>
        </span>
        {
          !!user ?
            post.user.id == user.sub ?
              <OptionMenu editButton={editButton} deleteButton={deleteButton} thisId={post._id} />
            :
              <button>Follow</button>
          : null
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
        {
          post.imageUrl ?
            <button className={styles.postImageButton} onClick={toDetail}>
              <img className={styles.postImage} src={post.imageUrl} />
            </button>
          :
            <span></span>
        }
      </span>
      <span className={styles.likeComment} >
        <span className={styles.buttonCounter}>
          <button onClick={() => likePost(post._id)} >Like</button>
          <p>0</p>
        </span>
        <span className={styles.buttonCounter}>
          <button onClick={toDetail} name={post._id}>Comment</button>
          <p>{post.totalComments}</p>
        </span>
      </span>
    </div>
  )
}
