const express = require('express')
const routes = express.Router()

const {signUpUser, signInUser} = require('./UserFunctions')

// user sign up
routes.post('/sign-up', async(req, res) =>{
    let newUserDetails = {
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.username
    }

    let signUpResult = await signUpUser(newUserDetails)

    if (signUpResult.error != null){
        res.json(signUpResult);
        return; 
    }

    let signInResult = await signInUser({email:newUserDetails.email, password:newUserDetails.password})

    if (signInResult.error != null){
        res.json(signInResult);
        return;
    }

    respObj = {
        jwt: await signInResult.user.getIdToken(),
        refreshToken: signInResult.user.refreshToken,
        displayName: signInResult.user.displayName,
        userId: signInResult.user.uid
    }
    
    res.json(respObj)

})

// user sign in
routes.post('/sign-in', async(req, res) =>{
    let userDetails = {
        email: req.body.email,
        password: req.body.password,
    }

let signInResult = await signInUser(userDetails)

if (signInResult.error != null){
    res.json(signInResult);
    return; 
}

respObj = {
    jwt: await signInResult.user.getIdToken(),
    refreshToken: signInResult.user.refreshToken,
    displayName: signInResult.user.displayName,
    userId: signInResult.user.uid
}

res.json(respObj)

})
   

module.exports = routes;