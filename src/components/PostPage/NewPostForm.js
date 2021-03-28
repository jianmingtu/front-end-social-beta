import React, { useState } from 'react'

import styles from './NewPostForm.module.css'
import { Button, IconButton } from '@material-ui/core'
import { PRIMARY_COLOR }  from '../../constant'
import { makeStyles } from '@material-ui/core/styles';
import PanoramaIcon from '@material-ui/icons/Panorama';
import Input from '@material-ui/core/Input';



const useStyles = makeStyles((theme) => ({

  submitButton : {
    borderRadius: 25,
    backgroundColor: PRIMARY_COLOR,
    padding: "2px 20px",
    color: "white",
    fontSize: "1rem"
  }
}));

export default function NewPostForm({user, submitPost, newPostError}) {
  const classes = useStyles();

  const [showFileInput, setShowFileInput] = useState(false)

  const handleImage = () => {
    setShowFileInput(!showFileInput)
  }

  const handleNewPost = (e) => {
    e.preventDefault()
    submitPost({content: e.target.content.value, imageFile: e.target.imageFile})
    e.target.content.value = ""
    if(e.target.imageFile)
      e.target.imageFile.value = ""
  }

  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={user.avatar} />
      <form className={styles.inputForm} onSubmit={handleNewPost}>
        <textarea className={styles.formText} name="content" placeholder="What's happening?" />
        <span className={styles.formButton}>

          <IconButton onClick={handleImage} >
            <PanoramaIcon  className={styles.svg_icons} style={{ color: PRIMARY_COLOR }}   />
          </IconButton>          
 
          <Button size="medium"  type="submit"  className={classes.submitButton} 
                variant="contained" >Post</Button> 
        </span>
        { 
          showFileInput ?
            <input className={styles.customFileInput}  name="imageFile" type="file" accept="image/*" />
          : null
        }
        {!!newPostError && <p>{newPostError}</p>}
      </form>
    </div>
  )
}
