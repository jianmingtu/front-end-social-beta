import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import PageHeader from '../components/PageHeader/PageHeader'
import {signOut} from '../network/userAuth'


export default function HeaderNavigation({setUserFunc}) {
  
  const history = useHistory()
  
  const onSignOut = () => {
     console.log("Sign out")
     signOut()
     setUserFunc(null)
     history.push("/")
   }
  return (
    <PageHeader 
      signOut={onSignOut}
    />
  )
}
