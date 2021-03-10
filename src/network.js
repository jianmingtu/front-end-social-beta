import axios from 'axios'
import { saveTokenInStorage,  getDecodedToken} from './userToken'

export async function signUp({email, password, username, photo}) {
  try {  
    const result = await axios.post('/users', {username, password,email})
    const token = result.data.accessToken
    saveTokenInStorage(token)
    return getDecodedToken()
  } catch (error) {
    throw (error.response.data.error ? Error(error.response.data.error) : error)
  }    
}

export async function login({username, password}) {
  try {
    const result = await axios.post('/users/login', {username, password})
    const token = result.data.accessToken
    saveTokenInStorage(token)
    return getDecodedToken()
  } catch (error) {
    throw (error.response.data.error ? Error(error.response.data.error) : error)
  }    
}