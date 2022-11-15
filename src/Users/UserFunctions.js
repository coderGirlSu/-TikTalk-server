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
    let jwt = token.split(" ")[1] // remove Bearer before token

    try {
        let result = await firebaseAdmin.auth().verifyIdToken(jwt, true)
        return result
    } catch(e)
     {
        return null
     }

}

module.exports = {
    signUpUser, signInUser, validateToken
}