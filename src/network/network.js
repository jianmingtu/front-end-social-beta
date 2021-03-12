import axios from 'axios'

import { upload } from '../s3'

export async function getPosts() {
  // try {
  //   const result = await axios.get(`/api/posts`, { headers: authHeader })
  //   return result.data
  // } catch (error) {
  //   console.log(error)
  //   alert(error.message)
  // }
}

export async function createPost({data}) {
  try {
    if(data.imageFile) {
      upload(data.imageFile.files[0])
    }
    // const result = await axios.post(`/api/posts`, {
    //   ...data
    // }, { headers: authHeader })
  } catch (error) {
    console.log(error)
  }
}

export async function getPost({postId}) {
  // try {
  //   const result = await axios.get(`/api/posts/${postId}`, { headers: authHeader })
  //   return result.data
  // } catch (error) {
  //   console.log(error)
  // }
}

export async function getComment({postId}) {
  // try {
  //   const result = await axios.get(`/api/posts/${postId}/comments`, { headers: authHeader })
  //   return result.data
  // } catch (error) {
  //   console.log(error)
  // }
}

export async function createComment({data, postId}) {
  // try {
  //   const result = await axios.post(`/api/posts/${postId}/comments`, {
  //     ...data
  //   }, { headers: authHeader })
  // } catch (error) {
  //   console.log(error)
  // }
}