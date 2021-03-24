import React, { useState } from 'react'

import UserComment from './UserComment'
import CommentForm from './CommentForm'
import OptionMenu from '../OptionMenu'
import styles from './PostDetail.module.css'
import { IconButton, Typography } from '@material-ui/core'
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import { PRIMARY_COLOR, BUTTON_COLOR }  from '../../constant'

export default function PostDetail({post, comments, user, submitEdit, deleteButton, submitComment, submitEditComment, deleteCommentButton, likePost}) {
  const [editing, setEditing] = useState(false)

  const editButton = (e) => {
    setEditing(true)
  }

  const cancelEdit = (e) => {
    setEditing(false)
  }

  const handleSubmitEdit = (e) => {
    e.preventDefault()
    submitEdit({content: e.target.content.value})
    setEditing(false)
  }

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
                  <p>{post.user.username}</p>
                </span>
                {
                  !!user ?
                    post.user.id == user.sub ?
                      <OptionMenu editButton={editButton} deleteButton={deleteButton} />
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
              </span>
              <span className={styles.likeComment}>
                <span className={styles.buttonCounter}>
                  <IconButton fontSize="medium" onClick={() => likePost(post._id)} >
                    {post.liked ? <ThumbUpAltRoundedIcon fontSize="medium" style={{ color: PRIMARY_COLOR }}  /> : <ThumbUpAltRoundedIcon fontSize="medium" style={{ color: BUTTON_COLOR }} /> }
                  </IconButton>
                  <Typography variant="body2" color="textPrimary" component="p">
                    {post.totalLikes}</Typography>
                </span>
                <span className={styles.buttonCounter}>
                  <button>Icon</button>
                  <p>{post.totalComments}</p>
                </span>
              </span>
            </div>
            <span className={styles.commentContainer}>
              {!!user && <CommentForm submitComment={submitComment} />} {/* This form will handle comment to the post */}
              {
                comments.length > 0 ?
                  comments.map(comment => (
                    <UserComment 
                      key={comment._id}
                      comment={comment}
                      user={user}
                      submitEditComment={submitEditComment}
                      deleteCommentButton={deleteCommentButton}
                    />
                  )).reverse()
                :
                  <p>No Comment</p>
              }
            </span>
          </div>
        :
          <p>404 Post Not Found</p>
      }
    </div>
  )
}
