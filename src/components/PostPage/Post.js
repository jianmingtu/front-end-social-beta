import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import OptionMenu from '../OptionMenu'
import styles from './Post.module.css'
import { Button, IconButton, Typography } from '@material-ui/core'
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded'
import { PRIMARY_COLOR, BUTTON_COLOR }  from '../../constant'
import CommentIcon from '@material-ui/icons/Comment';
import { makeStyles } from '@material-ui/core/styles';
import {formatDate} from '../../ultilities/common'

const useStyles = makeStyles((theme) => ({

  submitButton : {
    borderRadius: 25,
    backgroundColor: PRIMARY_COLOR,
    padding: "2px 20px",
    color: "white",
    fontSize: "1rem"
  }
}));

export default function Post({post, user, likePost, followUser, submitEdit, deleteButton, error}) {
  const classes = useStyles();

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
          <img className={styles.avatar} src={post.user.avatar} />
          <p>{post.user.username}  {formatDate(post.timestamp)}</p>
        </span>
        {
          !!user ?
            post.user.id == user.sub ?
              <OptionMenu editButton={editButton} deleteButton={deleteButton} thisId={post._id} />
            :
              <Button size="medium" className={classes.submitButton} variant="contained" onClick={() => followUser(post.user.id)}>
                {post.user.followed ? <>Unfollow</> : <>Follow</>}
              </Button>
          : null
        }
      </span>
      <span className={styles.postContent}>
        {
          editing ? 
            <form className={styles.inputForm} onSubmit={handleSubmitEdit}>
              <textarea className={styles.formText} name="content">{post.content}</textarea>
              <span className={styles.formButton}>
                <Button size="medium" className={classes.submitButton} variant="contained" type="button" onClick={cancelEdit}>Cancel</Button>
                <Button size="medium" className={classes.submitButton} variant="contained"   type="submit">Post</Button>
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
          <IconButton fontSize="medium" onClick={() => likePost(post._id)} >
            {post.liked ? <ThumbUpAltRoundedIcon fontSize="medium" style={{ color: PRIMARY_COLOR }}  /> : <ThumbUpAltRoundedIcon fontSize="medium" style={{ color: BUTTON_COLOR }} /> }
          </IconButton>
          <div>
            <p>{post.totalLikes}</p></div>
        </span>
        <span className={styles.buttonCounter}>
          <IconButton fontSize="medium" onClick={toDetail} name={post._id} >
            <CommentIcon fontSize="medium" style={{ color: PRIMARY_COLOR }}  />
          </IconButton>
          <div>
          <p>{post.totalComments}</p></div>
        </span>
      </span>
    </div>
  )
}
