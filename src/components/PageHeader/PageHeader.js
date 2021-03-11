import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom' 

import styles from './PageHeader.module.css'
import FadeMenu from './FadeMenu'

export default function PageHeader({user, signOut}) {

  const history = useHistory();

  return (
    <div className={styles.container}>
      <p>Logo Here</p>
      {
        !!user ?
          <span className={styles.rightContainer}>
            <p>Profile</p>
            <FadeMenu signOut = {signOut} />
          </span>        
        :
          <span className={styles.rightContainer}>
            <button onClick = { () => history.push("/login")}>Login</button>
          </span>
      }
    </div>
  )
}
