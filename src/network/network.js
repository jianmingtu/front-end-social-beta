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
    'Content-Type': 'application/json',
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
    await axios.post(`${BASE_API}/posts`, { ...data, imageUrl: ret?.location} 
    , { headers})

  } catch (err) {
    throw (err.message || JSON.stringify(err))
  }
}  
