import React from 'react'

import styles from './UserProfile.module.css'
import EditProfile from './EditProfile'
import { PRIMARY_COLOR }  from '../../constant'
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({

  submitButton : {
    borderRadius: 25,
    backgroundColor: PRIMARY_COLOR,
    padding: "2px 20px",
    color: "white",
    fontSize: "1rem"
  }
}));

export default function UserProfile({user, submitProfile, getProfile, error}) {
    const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const submitProfileClicked = (data) => {
    submitProfile(data)
    setOpen(false)
  }

  return (
    <div className={styles.container}>
      {console.log(user)}
      {
        user ?
          <div className={styles.profileContainer}>
            <span className={styles.profileUser}>
              <span className={styles.user}>
                <img className={styles.avatar} src={user.avatar} />
                <p>{user["cognito:username"]}</p>
              </span>

          <Button size="medium"  type="submit"  className={classes.submitButton} 
                variant="contained" onClick={handleClickOpen} >Edit</Button>               
            </span>
            <EditProfile fullScreen open={open} user={user} submitProfileClicked={submitProfileClicked} getProfile={getProfile} handleClose={handleClose} error={error} />
            <span className={styles.profileContent}>
              <p>Email: {user.email}</p>
              <p>Bio: {user.description}</p>
            </span>
          </div>
        :
          <p>No User</p>
      }
    </div>
    // Filter Post here if you want
  )
}
