import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Post from '../components/PostPage/Post'
import NewPostForm from '../components/PostPage/NewPostForm'
import { getPosts, getComments, createPost, updatePost, deletePost } from '../network/network'
import styles from './Layout.module.css'

export default function PostPage({user}) {
  const [posts, setPosts] = useState([])
  const [newPostError, setNewPostError] = useState("")

  const history = useHistory()

  useEffect(() => {
    getAPI()
  }, [])

  const getAPI = async () => {
    const result = await getPosts()
    setPosts(result)
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

  const likePost = async () => {

  }

  const toDetail = (data) => {
    const postId = data.target.attributes[0].value
    history.push(`/post/${postId}`)
  }

  const submitEdit = async (data) => {
    try {
      await updatePost(data.body, data.postId)
      console.log(data)
      getAPI()
    } catch (error) {
      alert(error)
    }
  }

  const deleteButton = async (data) => {
    const postId = data.target.attributes[1].value
    // Insert deletion warning here
    await deletePost({postId})
    getAPI()
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
              user={user}
              likePost={likePost}
              toDetail={toDetail}
              submitEdit={submitEdit}
              deleteButton={deleteButton}
            />
          ))
        :
          <p>No Post</p>
      }
    </div>
  )
}
