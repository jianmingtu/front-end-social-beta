import React, { useEffect, useState } from 'react'

import styles from './NewPostForm.module.css'

export default function NewPostForm() {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} src="https://cdn.discordapp.com/attachments/738356484462608424/816066240917405716/unknown.png" />
      <form className={styles.inputForm}>
        <textarea className={styles.formText} placeholder="What's happening?" />
        <span className={styles.formButton}>
          <button type="button">Icon</button>
          <button type="button">Icon</button>
          <button type="submit">Post</button>
        </span>
      </form>
    </div>
  )
}
