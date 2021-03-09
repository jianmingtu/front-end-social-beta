import React, { useEffect, useState } from 'react'

import styles from './Login.module.css'

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.loginButton}>
          <button>Login</button>
          <button>SignUp</button>
        </div>
        {
          true ? 
            <form className={styles.loginForm}>
              <input type="email" placeholder="Email" />
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm Password" />
              <button type="submit">Submit</button>
            </form>
          :
            <form className={styles.loginForm}>
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <button type="submit">Submit</button>
            </form>
        }
      </div>
    </div>
  )
}
