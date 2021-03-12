import React, { useEffect, useState } from 'react'

import Post from '../components/PostPage/Post'
import NewPostForm from '../components/PostPage/NewPostForm'
import { getPosts, createPost } from '../network/network'
import styles from './Layout.module.css'

export default function PostPage() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    (async () => {
      const result = await getPosts()
      // setPosts(result.posts)
    })()
  }, [])

  const submitPost = async (data) => {
    await createPost({data})
    console.log(data)
  }

  return (
    <div className={styles.container}>
      <NewPostForm submitPost={submitPost} />
      <Post />
    </div>
  )
}
