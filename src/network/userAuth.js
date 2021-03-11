import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js'
import jwtDecode from 'jwt-decode'

var poolData = {
	UserPoolId: 'us-east-2_gSslKueYh', // Your user pool id here
	ClientId: '1kh3f2b4thhdveuumtn9tqgb4v', // Your client id here
};


const userPool = new CognitoUserPool(poolData)

export function signUp({username, password, email}) {
  return new Promise((resolve, reject) => {
    const attributeList  = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
      // new CognitoUserAttribute({
      //   Name: 'full name',
      //   Value: "hello this is my name",
      // })
    ]
    
    userPool.signUp(username, password, attributeList, null, function( err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        reject(err)
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
        alert(err.message || JSON.stringify(err))
        reject(err)
        return
      }
      console.log('call result: ' + result)
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
        reject(err)
        alert(err.message || JSON.stringify(err));
      },
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

export function user() {
  // let user = null
  // try {
  //   const token = userToken();
  //   user = jwtDecode(token)
  // } catch (e) {
  // }
  // return user

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
  }).then (token => {
      return user = jwtDecode(token) 
  }).catch(e => {}) 
}

export function signOut() {
  currentUser()?.signOut()
}