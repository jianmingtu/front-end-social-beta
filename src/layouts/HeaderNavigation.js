import React from 'react'
import { useHistory } from 'react-router-dom'
import PageHeader from '../components/PageHeader/PageHeader'

export default function HeaderNavigation({user, setUserFunc}) {
  const history = useHistory()
  
  const toProfile = () => {
    console.log("Profile")
    if (user) {
      history.push(`/user/${user.sub}`)
    } else {
      history.push("/login")
    }
  }

  const onSignOut = () => {
    console.log("Sign out")
    setUserFunc(null)
    history.push("/")
  }

  return (
    <PageHeader 
      user={user}
      toProfile={toProfile}
      signOut={onSignOut}
    />
  )
}
