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
    return result.data.post
  } catch (error) {
    console.log(error)
  }
}

export async function updatePost(data, postId) {
  try {
    console.log(data)

    //Send the JWT in the header of the axios requests from the client
    const headers = await authHeader()
    await axios.put(`${BASE_API}/posts/${postId}`, { content: data.content } 
      , { headers })

  } catch (err) {
    throw (err.message || JSON.stringify(err))
  }
}

export async function deletePost({postId}) {
  try {
    const headers = await authHeader()
    await axios.delete(`${BASE_API}/posts/${postId}`, { headers })
  } catch (error) {
    console.log(error)
  }
}

export async function getComments({postId}) {
  try {
    const result = await axios.get(`${BASE_API}/posts/${postId}/comments`)
    console.log(result)
    return result.data.comments
  } catch (error) {
    console.log(error)
  }
}

export async function createComment({data, postId}) {
  try {
    const headers = await authHeader()
    await axios.post(`${BASE_API}/posts/${postId}/comments`, { content: data.content }
      , { headers })
  } catch (error) {
    console.log(error)
  }
}

export async function updateComment(data, postId, commentId) {
  try {
    console.log(data)

    //Send the JWT in the header of the axios requests from the client
    const headers = await authHeader()
    await axios.put(`${BASE_API}/posts/${postId}/comments/${commentId}`, { content: data.content } 
      , { headers })

  } catch (err) {
    throw (err.message || JSON.stringify(err))
  }
}

export async function deleteComment({postId, commentId}) {
  try {
    const headers = await authHeader()
    await axios.delete(`${BASE_API}/posts/${postId}/comments/${commentId}`, { headers })
  } catch (error) {
    console.log(error)
  }
}

export async function addLike({postId}) {
  try {
    const headers = await authHeader()
    await axios.post(`${BASE_API}/posts/${postId}/likes`, { content: {} } , { headers })
  } catch (error) {
    throw (error.message || JSON.stringify(error))
  }
}

export async function deleteLike({postId}) {
  try {
    const headers = await authHeader()
    console.log(`${BASE_API}/posts/${postId}/likes`)
    await axios.delete(`${BASE_API}/posts/${postId}/likes`, { headers })
  } catch (error) {
    throw (error.message || JSON.stringify(error))
  }
}

export async function getProfile(userId) {
  try {
    return await axios.get(`${BASE_API}/users/${userId}`)
  } catch (error) {
    throw (error.message || JSON.stringify(error))
  }
}

export async function saveProfile({file, description}) {
  try {
    const headers = await authHeader()

    // get secured url to upload image
    let signedURLResult = await axios.get(`${BASE_API}/secureUrl`, { headers })
    const { uploadURL, Key } = signedURLResult.data

    // Upload image to s3
    await axios.put(uploadURL, file)
    const imageUrl = uploadURL.split('?')[0]

    // update users in database
    await axios.put(`${BASE_API}/users`, { avatar: imageUrl, description: description } 
    , { headers })
  } catch (error) {
    throw (error.message || JSON.stringify(error))
  }
}


