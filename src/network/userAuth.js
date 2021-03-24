import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js'
import jwtDecode from 'jwt-decode'
import config from '../config.json'

var poolData = {
	UserPoolId: config.poolData.USER_POOL_ID, // Your user pool id here
	ClientId: config.poolData.CLIENT_ID, // Your client id here
};

const userPool = new CognitoUserPool(poolData)

export function signUp({username, password, email}) {
  return new Promise((resolve, reject) => {
    const attributeList  = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      })
    ]
    
    userPool.signUp(username, password, attributeList, null, function( err, result) {
      if (err) {
        reject (err.message || JSON.stringify(err))
        return;
      }
      const cognitoUser = result.user;
      resolve(cognitoUser)
      console.log('user name is ' + cognitoUser.getUsername());
    })
  })
}

export function confirmUser({code, username}) {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: username,
      Pool: userPool,
    }
  
    const cognitoUser = new CognitoUser(userData)
    cognitoUser.confirmRegistration(code, true, function(err, result) {
      if (err) {
        reject (err.message || JSON.stringify(err))
        return
      }
      resolve(result)
    })
  })
}

export function loginUser({username, password}) {
  return new Promise((resolve, reject) => {
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        const accessToken = result.getAccessToken().getJwtToken();
        resolve({result, accessToken})
      },
    
      onFailure: function(err) {
        reject (err.message || JSON.stringify(err))
        return
      }
    });
  })
}

export function currentUser() {
  return userPool.getCurrentUser()
}

// gets the jwt that needs to go in the header
export function userToken() {
  return new Promise((resolve, reject) => {
    const user = currentUser()
    if (!user) {
      reject(new Error("user not logged in"))
      return
    }
    user.getSession((error, session) => {
      if (error) {
        reject(error)
        return
      }
      resolve(session.getIdToken().getJwtToken())
    })
  })
}

// the decode a user's Jwt Token and return
export function currentDecodeUser() {
  return  userToken().then(JwtToken => { 
     console.log(jwtDecode(JwtToken))
    return (jwtDecode(JwtToken)) 
  }).catch( e => {
    console.log(e)
    return ""
  });
}

// remove token from local storage
export function signOut() {
  const user = currentUser();
  if(user) user.signOut()
}