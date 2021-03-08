import React, { useEffect, useState } from 'react'

import styles from './UserProfile.module.css'

export default function UserProfile() {
  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <span className={styles.profileUser}>
          <span className={styles.user}>
            <img className={styles.avatar} src="https://cdn.discordapp.com/attachments/738356484462608424/816066240917405716/unknown.png" />
            <p>Seal</p>
          </span>
          <button>Edit</button>
        </span>
        <span className={styles.profileContent}>
          <p>Post Content here</p>
        </span>
      </div>
    </div>
    // Filter Post here if you want
  )
}
