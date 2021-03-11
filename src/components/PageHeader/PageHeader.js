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
        {/* 1. show Profile and Sign Out */}
          <span className={styles.rightContainer}>
            <p>Profile</p>
            <FadeMenu signOut = {signOut} />
          </span>        
        :
        {/* 2. or, show Login button */} */}
          <span className={styles.rightContainer}>
            <button onClick = { () => history.push("/login")}>Login</button>
          </span>
      }
    </div>
  )
}
