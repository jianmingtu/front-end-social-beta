import jwtDecode from 'jwt-decode'

function getTokenFromStorage() {
  return localStorage.getItem('token')
}

function saveTokenInStorage(token) {
  localStorage.setItem('token', token)
}

 function removeTokenFromStorage() {
  localStorage.removeItem('token')
}

 function getDecodedToken() {
  let decoded = null
  try {
    decoded = jwtDecode(getTokenFromStorage())
  } catch (e) {
  }
  return decoded
}

export  {
    getTokenFromStorage,
    saveTokenInStorage,
    removeTokenFromStorage,
    getDecodedToken
}