import React, { useEffect, useState } from 'react'

import Post from '../components/PostPage/Post'
import { createPost } from '../network/network'


export default function PostPage({user}) {
  
  const [newPostError, setNewPostError] = useState("");
  
  const submitPost = async (data) => {
    try {
      await createPost({data})
      console.log(data)
    } catch (error) {
      setNewPostError(error)
    }
  }

  return (
    <>
    <Post submitPost={submitPost} user = {user} newPostError={newPostError}/>
    </>
  )
}
