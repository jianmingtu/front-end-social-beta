import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import Login from '../components/auth/Login'
import * as network from '../network'
import {CONS_EMAIL, CONS_PASSWORD,CONS_USERNAME, CONS_PHOTO }  from '../constant'

export default function PostPage({setUserFunc}) {

  const history = useHistory()
  const [error, setError] = useState()   

  const authFunc = async (e) => {
      try {

        if(e.target.name === "signup") {
          // sign up request
          const email = e.target.elements[CONS_EMAIL]?.value;
          const password = e.target.elements[CONS_PASSWORD]?.value;
          const username = e.target.elements[CONS_USERNAME]?.value;
          const photo = e.target.elements[CONS_PHOTO]?.value;
  
          network.signUp({email, password, username, photo})
        } 
        else 
        {
          // login request
          const username = e.target.elements[CONS_USERNAME]?.value;
          const password = e.target.elements[CONS_PASSWORD]?.value;
  
          network.login({ username, password})
        }
        // routing to the HOME page after successfully signup or login
        history.push("/")
        setError(null)      
      } catch( error) {
        // reset user and user token 
        setUserFunc(null);
        setError(error);
      }
  }

  return (
    //This will handle both login and signup, just need to send type back
    <Login authFunc = {authFunc} error={error} setError={setError} />
  )
}
