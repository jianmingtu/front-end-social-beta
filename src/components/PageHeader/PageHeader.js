import React from 'react'
import {useHistory} from 'react-router-dom' 

import styles from './PageHeader.module.css'
import FadeMenu from './FadeMenu'

export default function PageHeader({user, toProfile, getProfile, signOut, error}) {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <button className={styles.logoButton} onClick={() => history.push("/")}>
        <p>Logo Here</p>
      </button>
      {
        !!user ?
          <span className={styles.rightContainer}>
            <p>{user["cognito:username"]}</p>
            <FadeMenu user = {user} toProfile = {toProfile} getProfile={getProfile} signOut = {signOut} error={error} />
          </span>        
        :
          <span className={styles.rightContainer}>
            <button onClick = {() => history.push("/login")}>Login</button>
          </span>
      }
    </div>
  )
}
