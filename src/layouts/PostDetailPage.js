import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import PostDetail from '../components/PostDetailPage/PostDetail'
import { getPost, getComment, createComment } from '../network/network'

export default function PostDetailPage({user}) {
  const [post, setPost] = useState()
  const [comments, setComment] = useState()

  let { postId } = useParams()

  useEffect(() => {
    (async () => {
      const resultPost = await getPost({postId: postId})
      const resultComments = await getComment({postId: postId})
      setPost(resultPost)
      // setComment(resultComments.comments)
    })()
  }, [])

  const submitComment = async (data) => {
    await createComment({data, postId: postId})
  }

  const editButton = async (data) => {
    console.log("edit")
  }

  const deleteButton = async (data) => {
    console.log("delete")
  }

  return (
    //pass in comment list here for it to be rendered
    <PostDetail 
      post={post}
      comments={comments}
      user={user}
      submitComment={submitComment}
      editButton={editButton}
      deleteButton={deleteButton}
    />
  )
}
