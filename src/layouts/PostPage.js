import React, { useEffect, useState } from 'react'

import Post from '../components/PostPage/Post'
import NewPostForm from '../components/PostPage/NewPostForm'
import { getPosts, createPost } from '../network/network'
import styles from './Layout.module.css'

export default function PostPage({user}) {
  const [posts, setPosts] = useState([])
  const [newPostError, setNewPostError] = useState("")

  useEffect(() => {
    getAPI()
  }, [])

  const getAPI = async () => {
    const result = await getPosts()
    setPosts(result.posts)
  }

  const submitPost = async (data) => {
    try {
      await createPost({data})
      console.log(data)
      getAPI()
    } catch (error) {
      setNewPostError(error)
    }
  }

  return (
    <div className={styles.container}>
      {!!user && <NewPostForm submitPost={submitPost} newPostError={newPostError} />}
      {
        posts.length > 0 ?
          posts.map(post => (
            <Post 
              key={post._id}
              post={post}
            />
          ))
        :
          <p>No Post</p>
      }
    </div>
  )
}
