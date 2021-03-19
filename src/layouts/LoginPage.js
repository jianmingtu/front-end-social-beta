import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import Login from '../components/auth/Login'
import {CONS_EMAIL, CONS_PASSWORD,CONS_USERNAME, CONS_PHOTO }  from '../constant'
import { signUp, loginUser, currentDecodeUser } from '../network/userAuth'

export default function PostPage({setUserFunc}) {
  const [error, setError] = useState("")  

  const history = useHistory()

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
          alert("I's so glad you registered for the socialCafe. You will find a confirmation email sent from SocialCafe including a link. You will be able to click the link and then create your post or write your comments.  Enjoy your journey with SocialCafe.");
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
        console.log(currentUser);
        setUserFunc(currentUser);
        setError(null)      
      } catch( error) {
        // reset user and user token 
        setUserFunc(null);
        setError(error);
        console.log(error);
      }
  }

  return (
    //This will handle both login and signup, just need to send type back
    <Login authFunc = {authFunc} error={error} setError={setError} />
  )
}
