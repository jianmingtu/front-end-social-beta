import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import PostDetail from '../components/PostDetailPage/PostDetail'
import { getPost, updatePost, deletePost, getComments, createComment, updateComment, deleteComment, addLike, deleteLike, getProfile, addFollower, deleteFollower } from '../network/network'
import {currentDecodeUser} from '../network/userAuth'

export default function PostDetailPage({user}) {
  const [post, setPost] = useState()
  const [comments, setComment] = useState([])
  const [error, setError] = useState("")

  let { postId } = useParams()
  const history = useHistory()

  useEffect(async () => {
    try {
      await getPostAPI()
      await getCommentAPI() 
    } catch (error) {
      setError(error)
    }
  }, []) 

  const getPostAPI = async () => {
    const resultPost = await getPost({postId})
    const newLikePost = await updatePostLikes(resultPost)
    const newPost = await updatePostFollowers(newLikePost)
    setPost(newPost)
  }

  const getCommentAPI = async () => {
    const resultComments = await getComments({postId})
    console.log(resultComments)
    const newComments = await updateCommentFollowers(resultComments)
    console.log(newComments)
    setComment(newComments)
  }

  const updatePostLikes = async (post) => {
  
    // no need to convert if no user signs in
    if(!post) 
      return post   
    
    const decodedToken = await currentDecodeUser()
    // no need to convert if no user signs in
    if(!decodedToken) 
      return post
    
    let newPost = post

    // if the current user is in the post's likes, set liked flag to be true
    // if the current user voted Like on this post, the Like Icon shows in color and its value is set to be true
    const liked = post.likeUserIds.find(likeUserId => {
      return likeUserId === decodedToken.sub
    })
    newPost = { ...post, liked: liked ? true : false }

    return newPost
  } 

  const updatePostFollowers = async (post) => {
    // no need to convert if no user signs in
    if(!post) 
      return post   
    
    const decodedToken = await currentDecodeUser()
    // no need to convert if no user signs in
    if(!decodedToken) 
      return post
    
    let newPost = post

    //Check post detail and add to post
    const result = await getProfile(post.user.id)
    if(result && result.data && result.data.user && result.data.user.followers) {
      const followed = result.data.user.followers.find(follower => {
        return follower === decodedToken.sub
      })
      newPost = { ...post, user: { ...post.user, avatar: result.data.user.avatar, followed: followed ? true : false} }
    } else {
      newPost = { ...post, user: { ...post.user, avatar: result.data.user.avatar, followed: false} }
    }

    return newPost
  } 

  const updateCommentFollowers = async (comments) => {
    // no need to convert if no user signs in
    if(!comments) 
      return comments   
    
    const decodedToken = await currentDecodeUser()
    // no need to convert if no user signs in
    if(!decodedToken) 
      return comments
    

    const promises = comments.map(async comment => {
      const result = await getProfile(comment.user.id)
      if(result && result.data && result.data.user && result.data.user.followers) {
        const followed = result.data.user.followers.find(follower => {
          return follower === decodedToken.sub
        })
        return { ...comment, user: { ...comment.user, avatar: result.data.user.avatar, followed: followed ? true : false} }
      } else {
        return { ...comment, user: { ...comment.user, avatar: result.data.user.avatar, followed: false} }
      }
    })
    const newComments = await Promise.all(promises)

    return newComments
  }

  const submitEdit = async (data) => {
    try {
      await updatePost(data, postId)
      console.log(data)
      getPostAPI()
    } catch (error) {
      alert(error)
    }
  }

  const deleteButton = async () => {
    // Insert confirm delete here
    await deletePost({postId})
    history.push(`/`)
  }

  const submitComment = async (data) => {
    try {
      await createComment({data, postId})
      console.log(data)
      getCommentAPI()
      getPostAPI()
    } catch (error) {
      alert(error)
    }
  }

  const submitEditComment = async (data) => {
    try {
      await updateComment(data.body, postId, data.commentId)
      console.log(data)
      getCommentAPI()
    } catch (error) {
      alert(error)
    }
  }

  const deleteCommentButton = async (data) => {
    const commentId = data.target.attributes[1].value
    // Insert confirm delete here
    try {
      await deleteComment({postId, commentId})
      getCommentAPI()
      getPostAPI()
    } catch (error) {
      alert(error)
    }
  }

  const likePost = async (postId) => {
    try {
      if(!user)  {
        throw new Error("no user logged in.")
      }

      let newPost = null 
      if (post.liked) {
        await deleteLike({postId: postId}) 
        newPost = { ...post, totalLikes: post.totalLikes-1, liked: false }        
      } 
      else 
      {
        await addLike({postId: postId})
        newPost = { ...post, totalLikes: post.totalLikes+1, liked: true }      
      }
      setPost(newPost)

    } catch (error) {
      setError(error)
    }
  }
  
  const followUser = async (userId) => {
    try{
      if(!user)  {
        throw new Error("no user logged in.")
      }

      const decodedToken = await currentDecodeUser()  
          
    // no need to convert if no user signs in
      if(!decodedToken)  {
        throw new Error("no user logged in.")
      }   

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
      
      await getPostAPI()
      await getCommentAPI()
    } catch (error) {
      setError(error)
    }
  }

  return (
    //pass in comment list here for it to be rendered
    <PostDetail 
      post={post}
      comments={comments}
      user={user}
      submitComment={submitComment}
      submitEdit={submitEdit}
      deleteButton={deleteButton}
      submitEditComment={submitEditComment}
      deleteCommentButton={deleteCommentButton}
      likePost = {likePost}
      followUser = {followUser}
    />
  )
}
