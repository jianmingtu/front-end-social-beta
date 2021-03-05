import React, { useEffect, useState } from 'react'

import Login from '../components/auth/Login'

export default function PostPage() {
  return (
    //This will handle both login and signup, just need to send type back
    <Login />
  )
}
