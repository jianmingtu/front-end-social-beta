import React, { useEffect, useState } from 'react'

import Post from '../components/PostPage/Post'
import { createPost } from '../network'

const submitPost = async (data) => {
  await createPost({data})
  console.log(data)
}

export default function PostPage() {
  return (
    <Post submitPost={submitPost} />
  )
}
