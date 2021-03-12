import React, { useEffect, useState } from 'react'

import Post from '../components/PostPage/Post'
import NewPostForm from '../components/PostPage/NewPostForm'
import { createPost } from '../network/network'
import styles from './Layout.module.css'

const submitPost = async (data) => {
  await createPost({data})
  console.log(data)
}

export default function PostPage() {
  return (
    <div className={styles.container}>
      <NewPostForm submitPost={submitPost} />
      <Post />
    </div>
  )
}
