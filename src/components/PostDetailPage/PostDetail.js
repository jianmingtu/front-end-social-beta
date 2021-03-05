import React, { useEffect, useState } from 'react'

import UserComment from './UserComment'
import CommentForm from './CommentForm'

export default function PostDetail() {
  return (
    <div>
      <p>Post Detail Page</p>
      <CommentForm /> {/* This form will handle comment to the post */}
      <br />
      <UserComment />
    </div>
  )
}
