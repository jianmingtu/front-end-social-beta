import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import PostDetail from '../components/PostDetailPage/PostDetail'
import { getPost, updatePost, deletePost, getComment, createComment } from '../network/network'

export default function PostDetailPage({user}) {
  const [post, setPost] = useState()
  const [comments, setComment] = useState([])

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
    const resultComments = await getComment({postId})
    setComment(resultComments)
  }

  const submitComment = async (data) => {
    try {
      await createComment({data, postId})
      console.log(data)
      getCommentAPI()
    } catch (error) {
      alert(error)
    }
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

  const submitEditComment = async (data) => {
    console.log("edit")
  }

  const deleteCommentButton = async () => {
    console.log("delete")
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
    />
  )
}
