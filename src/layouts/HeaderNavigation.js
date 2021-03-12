import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import PageHeader from '../components/PageHeader/PageHeader'
import {signOut} from '../network/userAuth'


export default function HeaderNavigation({user, setUserFunc}) {
  
  const history = useHistory()
  
  const onSignOut = () => {
     console.log("Sign out")
     setUserFunc(null)
     history.push("/")
   }
  return (
    <PageHeader 
      user = {user}
      signOut={onSignOut}
    />
  )
}
