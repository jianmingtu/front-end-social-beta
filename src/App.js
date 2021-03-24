import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import HeaderNavigation from './layouts/HeaderNavigation'
import LoginPage from './layouts/LoginPage'
import UserProfilePage from './layouts/UserProfilePage'
import PostPage from './layouts/PostPage'
import PostDetailPage from './layouts/PostDetailPage'
import styles from './App.module.css'
import { currentDecodeUser, signOut } from './network/userAuth'
import { getProfile } from './network/network'

export default function App() {
  const [user, setUser] = useState({})

  useEffect(async () => {
    const decodedToken = await currentDecodeUser();
    const result = await getProfile(decodedToken.sub)
    if(result && result.data && result.data.user) {
      setUserFunc({...decodedToken, avatar: result.data.user.avatar, description: result.data.user.description})
    } else {
      setUser(decodedToken)
    }
  }, [])

  // update the current user state.  if update is falsely value,  call signOut to remove user tokens from local storage.  
  const setUserFunc = userUpdate => {
    setUser(userUpdate)
    if(!userUpdate) signOut();
  }

  return (
    <Router>
      {console.log(user)}
      <HeaderNavigation user={user} setUserFunc={setUserFunc} />
      <main className={styles.main}>
        <Switch>
          <Route path="/login">
            <LoginPage setUserFunc={setUserFunc} />
          </Route>
          <Route path="/user/:userId?"> {/* Currently visiting other user is on hold */}
            <UserProfilePage user={user} setUserFunc={setUserFunc} />
          </Route>
          <Route path="/post/:postId">
            <PostDetailPage user={user} />
          </Route>
          <Route path="/">
            <PostPage user={user} />
          </Route>
        </Switch>
      </main>
    </Router>
  )
}
