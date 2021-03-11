import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import Login from '../components/auth/Login'
import {CONS_EMAIL, CONS_PASSWORD,CONS_USERNAME, CONS_PHOTO }  from '../constant'
import { signUp, loginUser, currentDecodeUser } from '../network/userAuth'

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
  
          // signUp({email, password, username, photo})
          await signUp({email, password, username, photo})
        } 
        else 
        {
          // loginUser request
          const username = e.target.elements[CONS_USERNAME]?.value;
          const password = e.target.elements[CONS_PASSWORD]?.value;
  
          await loginUser({ username, password})
        }
        // routing to the HOME page after successfully signup or login
        history.push("/")
        const currentUser = await currentDecodeUser();
        setUserFunc(currentUser);
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
