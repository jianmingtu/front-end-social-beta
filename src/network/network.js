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
  return { Authorization: `Bearer ${token}` }
}

export async function createPost({data}) {
  try {

    console.log(data)

    // if(data.imageFile) {
    //   upload(data.imageFile.files[0])
    // }

    // upload.single('image')
    
    console.log(...data)
    //Send the JWT in the header of the axios requests from the client
    await axios.post(`/api/posts`, ...data
    , { headers: authHeader() })

  } catch (error) {
    throw (error.response.data.error ? Error(error.response.data.error) : error)
  }
}  
