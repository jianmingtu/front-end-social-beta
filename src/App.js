import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

import HeaderNavigation from './layouts/HeaderNavigation'
import LoginPage from './layouts/LoginPage'
import UserProfilePage from './layouts/UserProfilePage'
import PostPage from './layouts/PostPage'
import PostDetailPage from './layouts/PostDetailPage'
import styles from './App.module.css'
import {getDecodedToken, removeTokenFromStorage} from './userToken'

export default function App() {
  const [user, setUser] = useState(getDecodedToken())

  const setUserFunc = user => {
    setUser(user)
    if(!user) removeTokenFromStorage();
  }

  return (
    <Router>
      <HeaderNavigation />
      <main className={styles.main}>
        <Switch>
          <Route path="/login">
            <LoginPage setUserFunc = {setUserFunc} />
          </Route>
          <Route path="/user/:userId?"> {/* Default link should redirect to current user's profile, maybe redirect to login if no current user */}
            <UserProfilePage />
          </Route>
          <Route path="/post/:postId">
            <PostDetailPage />
          </Route>
          <Route path="/">
            <PostPage />
          </Route>
        </Switch>
      </main>
    </Router>
  )
}
