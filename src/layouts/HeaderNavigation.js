import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import PageHeader from '../components/PageHeader/PageHeader'
import * as network from '../network/network'


export default function HeaderNavigation({user, setUserFunc}) {
  const history = useHistory()

  const [error, setError] = useState()
  
  const toProfile = async (data) => {

    try {
      await network.saveProfile(data)
    } catch (error) {
      setError(error.message)
    }
  }

  const getProfile = async () => {
    try {
      // request the current user
      if(!!user) {
        const result = await network.getProfile(user)
        if(result && result.data && result.data.user) {
          setUserFunc({...user, avatar: result.data.user.avatar, description: result.data.user.description})
        }
      }
    } catch (error) {
      setError(error.message)
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
      error = {error}
      getProfile={getProfile}
    />
  )
}
