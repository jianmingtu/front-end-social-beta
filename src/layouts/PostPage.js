import React, { useEffect, useState } from 'react'

import Post from '../components/PostPage/Post'
import NewPostForm from '../components/PostPage/NewPostForm'
import { getPosts, getComments, createPost, updatePost, deletePost, addLike, deleteLike } from '../network/network'
import styles from './Layout.module.css'
import {useHistory} from 'react-router-dom'
import {currentDecodeUser} from '../network/userAuth'

export default function PostPage({user}) {
  const [posts, setPosts] = useState([])
  const [newPostError, setNewPostError] = useState("")
  const [error, setError] = useState("")

  const history = useHistory()

  useEffect(() => {
    getAPI()
  }, [])

  const getAPI = async () => {
    // we have to call currentDecodeUser() here because the user being passed to this function PostPage() is undefined at this moment
    const decodedToken = await currentDecodeUser();
    const posts = await getPosts()
    const newPosts = posts.map(post => {
      // if the current user is in the post's likes, set liked flag to be true
      if(user) {
        const liked = post.likeUserIds.find(
          likeUserId => {

            console.log("likeUserId", likeUserId)
            console.log("user.sub", decodedToken.sub)
              return likeUserId === decodedToken.sub
            }
          )
          if (liked) { 
            return { ...post,  liked: true }
          }
          else {
            return post
          }
        }
    })
    

    setPosts(newPosts)
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
      setError(error)
    }
  }

  const deleteButton = async (data) => {
    const postId = data.target.attributes[1].value
    // Insert deletion warning here
    await deletePost({postId})
    getAPI()
  }

  const likePost = async (postId) => {

    try {
        // To avoid Await in a For-Loop, we choose promise all
        const promises = posts.map(post => {
            if( post._id === postId) {
               if (post.liked) { 
                   deleteLike({postId: postId})
                  return { ...post, totalLikes: post.totalLikes-1, liked: false }
               } else {
                   addLike({postId: postId})
                  return { ...post, totalLikes: post.totalLikes+1, liked: true }
               }
            }
            else{
              return post
            }
        })

        const newPosts = await Promise.all(promises)

        setPosts(newPosts)

      } catch (error) {
        setError(error)
    }

  }


  return (
    <div className={styles.container}>
    <p>{error}</p>
      {!!user && <NewPostForm submitPost={submitPost} newPostError={newPostError} />}
      {
        (posts && posts.length) > 0 ?
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
