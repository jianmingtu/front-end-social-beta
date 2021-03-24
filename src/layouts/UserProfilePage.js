import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as network from '../network/network'

import UserProfile from '../components/Profile/UserProfile'

export default function UserProfilePage({user, setUserFunc}) {
  let { userId } = useParams()

  const [error, setError] = useState()

  const submitProfile = async (data) => {
    try {
      await network.saveProfile(data)
      await getProfile()
    } catch (error) {
      setError(error.message)
    }
  }

  const getProfile = async () => {
    try {
      // request the current user
      if(!!user) {
        const result = await network.getProfile(user.sub)
        if(result && result.data && result.data.user) {
          setUserFunc({...user, avatar: result.data.user.avatar, description: result.data.user.description})
        }
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <UserProfile 
      user={user} 
      submitProfile={submitProfile}
      getProfile={getProfile}
      error={error}
    />
  )
}
