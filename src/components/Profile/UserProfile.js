import React from 'react'

import styles from './UserProfile.module.css'
import EditProfile from './EditProfile'

export default function UserProfile({user, submitProfile, getProfile, error}) {
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
                <img className={styles.avatar} src="https://cdn.discordapp.com/attachments/738356484462608424/816066240917405716/unknown.png" />
                <p>{user["cognito:username"]}</p>
              </span>
              <button onClick={handleClickOpen}>Edit</button>
            </span>
            <EditProfile fullScreen open={open} user = {user} submitProfileClicked={submitProfileClicked} getProfile={getProfile} handleClose={handleClose} error={error} />
            <span className={styles.profileContent}>
              <p>Email: {user.email}</p>
            </span>
          </div>
        :
          <p>No User</p>
      }
    </div>
    // Filter Post here if you want
  )
}
