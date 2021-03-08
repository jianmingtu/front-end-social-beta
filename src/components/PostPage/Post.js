import React, { useEffect, useState } from 'react'

import NewPostForm from './NewPostForm'
import styles from './Post.module.css'

export default function Post() {
  return (
    <div className={styles.container}>
      <NewPostForm />
      <p>Post Page</p>
    </div>
  )
}
