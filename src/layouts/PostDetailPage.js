import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import PostDetail from '../components/PostDetailPage/PostDetail'
import { getPost, updatePost, deletePost, getComments, createComment, updateComment, deleteComment, addLike, deleteLike } from '../network/network'

export default function PostDetailPage({user}) {
  const [post, setPost] = useState()
  const [comments, setComment] = useState([])
   const [error, setError] = useState("")

  let { postId } = useParams()
  const history = useHistory()

  useEffect(() => {
    getPostAPI()
    getCommentAPI()
  }, [])

  const getPostAPI = async () => {
    const resultPost = await getPost({postId})
    setPost(resultPost)
  }

  const getCommentAPI = async () => {
    const resultComments = await getComments({postId})
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
      let newPost = null 
      if (post.liked) {
        await deleteLike(postId) 
        newPost = { ...post, totalLikes: post.totalLikes-1, liked: false }        
      } 
      else 
      {
        await addLike(postId)
        newPost = { ...post, totalLikes: post.totalLikes+1, liked: true }      
      }
      setPost(newPost)

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
    />
  )
}
