const firebaseAdmin = require('firebase-admin')

const {firebaseConfig} = require('../../keys/firebaseClientKey')
const firebaseClient = require("firebase/app")

const {getAuth, signInWithEmailAndPassword} = require ("firebase/auth")

firebaseClient.initializeApp(firebaseConfig) // set up firebase code using the config in firebaseConfig

// user sign up
async function signUpUser(userDetails) {
    try{
        let newUser = await firebaseAdmin.auth().createUser({
            email: userDetails.email,
            emailVerified: true,
            password: userDetails.password,
            displayName: userDetails.displayName
        })
        //await firebaseAdmin.auth().setCustomUserClaims(newUser.uid, {regularUser: true}
        return newUser
    }catch(e){
        return {error:e}
    }
    
}

// user sign in

async function signInUser(userDetails){
    try{
        const auth = getAuth() 
        let signInResult = await signInWithEmailAndPassword(auth, userDetails.email, userDetails.password)
        return signInResult
    } catch(e){
        return {error:e}
    }
    
}

// create a validate token function to verify the user token 
async function validateToken(token){
    try {
        let jwt = token.split(" ")[1] // remove Bearer before token
        let result = await firebaseAdmin.auth().verifyIdToken(jwt, true)
        console.log(result)
        return result
    } catch(e)
     {
        return null
     }

}

module.exports = {
    signUpUser, signInUser, validateToken
}