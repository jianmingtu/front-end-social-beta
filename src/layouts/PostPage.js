import React, { useEffect, useState } from 'react'

import Post from '../components/PostPage/Post'

const createPost = (data) => {
  console.log(data)
}

export default function PostPage() {
  return (
    <Post createPost={createPost} />
  )
}
