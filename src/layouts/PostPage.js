import React, { useEffect, useState } from 'react'

import Post from '../components/PostPage/Post'
import NewPostForm from '../components/PostPage/NewPostForm'
import { getPosts, createPost, updatePost, deletePost, addLike, deleteLike, getProfile, addFollower, deleteFollower } from '../network/network'
import styles from './Layout.module.css'
import { currentDecodeUser } from '../network/userAuth'
import { useLocation } from "react-router-dom"

export default function PostPage({user}) {
  const [posts, setPosts] = useState([])
  const [newPostError, setNewPostError] = useState("")
  const [error, setError] = useState("")
    let location = useLocation()

  useEffect(async () => {
    await getAPI()
  }, [])

  useEffect(() => {
    let query = new URLSearchParams(location.search);
    const search = query.get("search")
    getAPI(search)
  }, [location])

  const getAPI = async (search = "") => {
    const postsResult = await getPosts({search})
    const newLikePosts = await updatePostLikes(postsResult)
    const newPosts = await updateFollowers(newLikePosts)
    setPosts(newPosts)
  }

  const updatePostLikes = async (posts) => {
    let newPosts = []    

    const decodedToken = await currentDecodeUser()
    // no need to convert if no user signs in
      if(!decodedToken) 
        return posts      

    // if the current user is in the post's likes, set liked flag to be true
    newPosts = posts.map(post => {
      // if the current user voted Like on this post, the Like Icon shows in color and its value is set to be true
      const liked = post.likeUserIds.find(likeUserId => {
        return likeUserId === decodedToken.sub
      })
      return { ...post, liked: liked ? true : false }
    })

    return newPosts
  } 

  const updateFollowers = async (posts) => {
    const decodedToken = await currentDecodeUser()

    // no need to convert if no user signs in
      if(!decodedToken) 
        return posts     

    const promises = posts.map(async post => {
      const result = await getProfile(post.user.id)
      if(result && result.data && result.data.user && result.data.user.followers) {
        console.log(result.data.user)
        const followed = result.data.user.followers.find(follower => {
          return follower === decodedToken.sub
        })
        return { ...post, user: { ...post.user, avatar: result.data.user.avatar, followed: followed ? true : false} }
      } else {
        if(result && result.data && result.data.user && result.data.user.avatar) {
          return { ...post, user: { ...post.user, avatar: result.data.user.avatar, followed: false} }
        } else {
          return { ...post, user: { ...post.user, avatar: null, followed: false} }
        }
      }
    })
    const newPosts = await Promise.all(promises)

    return newPosts
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
      if(!user)  
      throw new Error("no user logged in.")

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
      setError(error.message)
    }
  }

  const followUser = async (userId) => {
    try{
      if(!user)  {
        throw new Error("no user logged in.")
      }
      const decodedToken = await currentDecodeUser()

    // no need to convert if no user signs in
      if(!decodedToken) 
        throw new Error("no user logged in.")   

      const result = await getProfile(userId)
      if(result && result.data && result.data.user && result.data.user.followers) {
        const followed = result.data.user.followers.find(follower => {
          return follower === decodedToken.sub
        })

        if(followed) {
          await deleteFollower(userId)
        } else {
          await addFollower(userId)
        }
      } else {
        await addFollower(userId)
      }

      await getAPI()
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div className={styles.container}>
    <p>{error}</p>
      {!!user && <NewPostForm user={user} submitPost={submitPost} newPostError={newPostError} />}
      {console.log(posts)}
      {
        (posts && posts.length > 0) ?
          posts.map(post => (
            post ?
              <Post 
                key={post._id}
                post={post}
                user={user}
                likePost={likePost}
                followUser={followUser}
                submitEdit={submitEdit}
                deleteButton={deleteButton}
                error = {error}
              />
            :
              <p>Error getting post</p>
          ))
        :
          <p>No Post</p>
      }
    </div>
  )
}
