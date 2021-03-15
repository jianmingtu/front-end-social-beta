import axios from 'axios'
import { upload } from '../s3'
import {userToken} from './userAuth'

const BASE_API = "https://lpmp2m4ovd.execute-api.us-east-2.amazonaws.com/prod"

// get user JWT token from the user Cognito's local storage and create an Authorization header.
async function authHeader() {
  const token = await userToken()
  if (!token) {
    return {}
  }
  return { Authorization: `${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

export async function getPosts() {
  try {
    const result = await axios.get(`${BASE_API}/posts`)
    console.log(result)
    return result.data.posts
  } catch (error) {
    console.log(error)
    alert(error.message)
  }
}

export async function createPost({data}) {
  try {
    console.log(data)

    let ret = null;
    if(data.imageFile) {
      ret = await upload(data.imageFile.files[0])
    }
    //Send the JWT in the header of the axios requests from the client
    const headers = await authHeader()
    await axios.post(`${BASE_API}/posts`, { content: data.content, imageUrl: ret?.location } 
      , { headers })

  } catch (err) {
    throw (err.message || JSON.stringify(err))
  }
}  

export async function getPost({postId}) {
  try {
    const result = await axios.get(`${BASE_API}/posts/${postId}`)
    console.log(result)
    return result.data.posts
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