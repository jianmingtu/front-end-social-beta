import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import PostDetail from '../components/PostDetailPage/PostDetail'
import { getPost, getComment, createComment } from '../network/network'

export default function PostDetailPage() {
  const [post, setPost] = useState()
  const [comments, setComment] = useState()

  let { postId } = useParams()

  const submitComment = async data => {
    await createComment({data, postId: postId})
  }

  useEffect(() => {
    (async () => {
        const resultPost = await getPost({postId: postId})
        const resultComments = await getComment({postId: postId})
        console.log(resultPost)
        // setPost(resultPost.post)
        // setComment(resultComments.comments)
    })()
  }, [])

  return (
    //pass in comment list here for it to be rendered
    <PostDetail 
      comments={comments}
      submitComment={submitComment}
    />
  )
}
