import React, { useState } from 'react'

import OptionMenu from '../OptionMenu'
import styles from './UserComment.module.css'
import { PRIMARY_COLOR }  from '../../constant'
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({

  submitButton : {
    borderRadius: 25,
    backgroundColor: PRIMARY_COLOR,
    padding: "2px 10px",
    color: "white",
    fontSize: "1rem"
  }
}));

export default function UserComment({comment, user, submitEditComment, deleteCommentButton, followUser}) {
    const classes = useStyles();
  const [editing, setEditing] = useState(false)

  const editButton = (e) => {
    setEditing(true)
  }

  const cancelEdit = (e) => {
    setEditing(false)
  }

  const handleSubmitEdit = (e) => {
    e.preventDefault()
    submitEditComment({body: {content: e.target.content.value}, commentId: comment._id})
    setEditing(false)
  }

  return (
    <div className={styles.comment}>
      <div className={styles.commentContainer}>
        <img className={styles.avatar} src={comment.user.avatar} />
        <div className={styles.commentBlock}>
          <span className={styles.commentUser}>
            {console.log(comment)}
            <p>{comment.user.username}</p>
            {
              !!user ?
                comment.user.id == user.sub ?
                  <OptionMenu editButton={editButton} deleteButton={deleteCommentButton} thisId={comment._id} />
                :
                <Button size="medium" className={classes.submitButton} variant="contained" onClick={() => followUser(comment.user.id)}>
                  {comment.user.followed ? <>Unfollow</> : <>Follow</>}
                </Button>

              : null
            }
          </span>
          {
            editing ? 
              <form className={styles.inputForm} onSubmit={handleSubmitEdit}>
                <textarea className={styles.formText} name="content">{comment.content}</textarea>
                <span className={styles.formButton}>
                <Button size="medium" className={classes.submitButton} variant="contained" type="button" onClick={cancelEdit}>Cancel</Button>
                <Button size="medium" className={classes.submitButton} variant="contained"   type="submit">Comment</Button>

                </span>
              </form>
            :
              <p className={styles.commentText}>{comment.content}</p>
          }
        </div>
      </div>
      {/* <span className={styles.likeComment}>
        <span className={styles.buttonCounter}>
          <button>Icon</button>
          <p>0</p>
        </span>
        <span className={styles.buttonCounter}>
          <button>Icon</button>
          <p>1</p>
        </span>
      </span> */}
    </div>
    //If needed add CommentForm component here to for nested comments
    //Add UserComment component if there are any nested comments in data
  )
}
