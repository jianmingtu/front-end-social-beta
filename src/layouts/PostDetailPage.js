import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import PostDetail from '../components/PostDetailPage/PostDetail'
import { getPost, updatePost, deletePost, getComment, createComment } from '../network/network'

export default function PostDetailPage({user}) {
  const [post, setPost] = useState()
  const [comments, setComment] = useState()

  let { postId } = useParams()
  const history = useHistory()

  useEffect(() => {
    getPostAPI()
    getCommentAPI()
  }, [])

  const getPostAPI = async () => {
    const resultPost = await getPost({postId: postId})
    setPost(resultPost)
  }

  const getCommentAPI = async () => {
    const resultComments = await getComment({postId: postId})
    // setComment(resultComments.comments)
  }

  const submitComment = async (data) => {
    await createComment({data, postId: postId})
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

  const deleteButton = async (data) => {
    // Insert confirm delete here
    await deletePost({postId})
    history.push(`/`)
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
    />
  )
}
