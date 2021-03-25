import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import PostDetail from '../components/PostDetailPage/PostDetail'
import { getPost, updatePost, deletePost, getComments, createComment, updateComment, deleteComment, addLike, deleteLike, addFollower, deleteFollower } from '../network/network'
import {currentDecodeUser} from '../network/userAuth'

export default function PostDetailPage({user}) {
  const [post, setPost] = useState()
  const [comments, setComment] = useState([])
  const [error, setError] = useState("")

  let { postId } = useParams()
  const history = useHistory()

  useEffect(async () => {
    getPostAPI()
    getCommentAPI()
  }, [])

  useEffect(async () => {
    const newPost = await updatePostLikes(post)
    setPost(newPost)    
  }, [user])  

  const getPostAPI = async () => {
    const resultPost = await getPost({postId})
    const newPost = await updatePostLikes(resultPost)
    setPost(newPost)
  }

  const getCommentAPI = async () => {
    const resultComments = await getComments({postId})
    console.log(resultComments)
    setComment(resultComments)
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
      if(!user)  throw new Error("no user logged in.")

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
  
  const followUser = async () => {
    try{
      if(!user)  throw new Error("no user logged in.")

      let newPost = null
      if (post.user.followed) {
        await deleteFollower(post.user.id)
        newPost = { ...post, user: { ...post.user, followed: false } }
      } else {
        await addFollower(post.user.id)
        newPost = { ...post, user: { ...post.user, followed: true } }
      }
      setPost(newPost)

    } catch (error) {
      setError(error)
    }
  }

  const updatePostLikes = async (post) => {
    let newPost = post

    if(post) {
      const decodedToken = await currentDecodeUser();  
      // if the current user is in the post's likes, set liked flag to be true
      // if the current user voted Like on this post, the Like Icon shows in color and its value is set to be true
      const liked = post.likeUserIds.find(likeUserId => {
        return decodedToken ? likeUserId === decodedToken.sub : false
      })
      newPost = { ...post, liked: liked }
    }

    return newPost
  } 

  const updatePostFollowers = async (post) => {
    
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
