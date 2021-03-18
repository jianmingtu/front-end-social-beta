import React, { useEffect, useState } from 'react'

import styles from './UserProfile.module.css'

export default function UserProfile({user}) {
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
              <button>Edit</button>
            </span>
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
