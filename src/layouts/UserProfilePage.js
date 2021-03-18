import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import UserProfile from '../components/UserProfile'

export default function UserProfilePage({user}) {
  let { userId } = useParams()

  return (
    <UserProfile user={user} />
  )
}
