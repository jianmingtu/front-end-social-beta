import React, { useEffect, useState } from 'react'

import Post from '../components/PostPage/Post'
import NewPostForm from '../components/PostPage/NewPostForm'
import { getPosts, getComments, createPost, updatePost, deletePost, addLike, deleteLike } from '../network/network'
import styles from './Layout.module.css'
import {useHistory} from 'react-router-dom'

export default function PostPage({user}) {
  const [posts, setPosts] = useState([])
  const [newPostError, setNewPostError] = useState("")
  const [error, setError] = useState("")

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

  const likePost = async (postId}) => {

    try {
        const newpost = posts.find( post => (post._id === postId)) 

        if (post.liked) {
          await deleteLike({postId})  
          
          setPosts
          posts.map(post=>{
              newpost

              oldpost

          })
        } else {
          await addLike(postId)
        }
      } catch (error) {
        setError(error)
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
              user={user}
              likePost={likePost}
              submitEdit={submitEdit}
              deleteButton={deleteButton}
              error = {error}
            />
          ))
        :
          <p>No Post</p>
      }
    </div>
  )
}
