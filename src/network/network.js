import axios from 'axios'

import { upload } from '../s3'

const BASE_API = 'https://lpmp2m4ovd.execute-api.us-east-2.amazonaws.com/prod/'

export async function getPosts() {
  try {
    const result = await axios.get(`${BASE_API}/posts`)
    console.log(result.data)
    return result.data
  } catch (error) {
    console.log(error)
    alert(error.message)
  }
}

export async function createPost({data}) {
  //Leaving this to Jiangming

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
  try {
    const result = await axios.get(`${BASE_API}/posts/${postId}`)
    console.log(result)
    return result.data
  } catch (error) {
    console.log(error)
  }
}

export async function getComment({postId}) {
  // don't think we got the comment database set up yet
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