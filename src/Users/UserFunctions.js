const firebaseAdmin = require('firebase-admin')

const {firebaseConfig} = require('../../keys/firebaseClientKey')
const firebaseClient = require("firebase/app")

const {getAuth, signInWithEmailAndPassword} = require ("firebase/auth")

firebaseClient.initializeApp(firebaseConfig)

async function signUpUser(userDetails){
    let newUser = await firebaseAdmin.auth().createUser({
        email: userDetails.email,
        emailVerified: true,
        password: userDetails.password,
        displayName: userDetails.displayName
    })

    await firebaseAdmin.auth().setCustomUserClaims(newUser.uid, {regularUser: true})

    return newUser
}

async function signInUser(userDetails){
    const auth = getAuth()
    let signInResult = await signInWithEmailAndPassword(auth, userDetails.email, userDetails.password)
   
     return signInResult
}

async function validateToken(token){
    let jwt = token.split(" ")[1]

    try {
        let result = await firebaseAdmin.auth().verifyIdToken(jwt, true)
        return result
    } catch(e)
     {
        return null
     }

    

        // console.log(`Decoded session token is ${JSON.stringify(decodedToken)}`);

    //     return {
    //         isValid: true,
    //         uid: decodedToken.uid,
    //         fullDecodedToken: decodedToken
    //     }
    // }).catch((error) => {
    //     if (error.code == 'auth/id-token-revoked') {
    //         // Token has been revoked. Inform the user to reauthenticate or signOut() the user.
    //         console.log("You must sign in again to access this. Full error is: \n" + error);
    //     } else {
    //         // Token is invalid.
    //         console.log("Session token is invalid. Full error is: \n" + error);
    //     }
          
    //     return {error:error};
    // });
}

module.exports = {
    signUpUser, signInUser, validateToken
}