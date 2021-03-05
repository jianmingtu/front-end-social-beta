import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

import PostPage from './layouts/PostPage'
import PostDetailPage from './layouts/PostDetailPage'

export default function App() {
  return (
    <Router>
      <main style={{marginTop: 100}}></main>
      <Switch>
        <Route path="/post/:postId">
          <PostDetailPage />
        </Route>
        <Route path="/">
          <PostPage />
        </Route>
      </Switch>
    </Router>
  )
}
