import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import { CONS_EMAIL, CONS_PASSWORD,CONS_USERNAME }  from '../../constant'

export default function Login({authFunc, error, setError}) {
    const  SIGNUP = 0, LOGIN = 1 
    const [tab, setTab] = useState(SIGNUP)

  const submit = (e) => {
    e.preventDefault()

    if(e.target.name === "signup")
    {
      if(e.target.elements[CONS_PASSWORD]?.value !== e.target.elements["confirmPassword"]?.value ) {
         setError("The passwords don't match.");
         return;
      }
    }
    authFunc(e)
  }

  useEffect(() => {
    document.querySelector("#signup").focus();
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.loginButton}>
          <button onClick={() => setTab(LOGIN)} >Login</button>
          <button id = "signup" onClick={() => setTab(SIGNUP)} >SignUp</button>
        </div>
        {
          !tab ? 
            <form className={styles.loginForm} name="signup" onSubmit = {submit}>
              <input type="email" name = {CONS_EMAIL} placeholder="Email" />
              <input type="text" name ={CONS_USERNAME} placeholder="Username" />
              <input type="password" name ={CONS_PASSWORD} placeholder="Password" />
              <input type="password" name ="confirmPassword" placeholder="Confirm Password" />
              {!!error && <p>{error}</p>}
              <button type="submit">Submit</button>
            </form>
          :
            <form className={styles.loginForm} name="login" onSubmit = {submit}>
              <input type="text"name ={CONS_USERNAME}   placeholder="Username" />
              <input type="password" name ={CONS_PASSWORD} placeholder="Password" />
              {!!error && <p>{error}</p>}
              <button type="submit">Submit</button>
            </form>
        }
      </div>
    </div>
  )
}


   