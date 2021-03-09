import React, { useEffect, useState } from 'react'

import styles from './PageHeader.module.css'

export default function PageHeader() {
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
            <button>Dropdown</button>
          </span>
      }
    </div>
  )
}
