import React, { useEffect, useState } from 'react'

import styles from './PageHeader.module.css'
import FadeMenu from './FadeMenu'

export default function PageHeader({signOut}) {
  return (
    <div className={styles.container}>
      <p>Logo Here</p>
      {
        !true ?
          <span className={styles.rightContainer}>
            <button>Login</button>
          </span>
        :
          <span className={styles.rightContainer}>
            <p>Profile</p>
            <FadeMenu signOut = {signOut} />
          </span>
      }
    </div>
  )
}
