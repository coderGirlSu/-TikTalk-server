const express = require('express')
const routes = express.Router()

const {signUpUser, signInUser} = require('./UserFunctions')

routes.post('/sign-up', async(req, res) =>{
    let newUserDetails = {
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.username
    }

    let signUpResult = await signUpUser(newUserDetails)

    let signInResult = await signInUser({email:newUserDetails.email, password:newUserDetails.password})
    
    res.json(signInResult)

})


routes.post('/sign-in', async(req, res) =>{
    let userDetails = {
        email: req.body.email,
        password: req.body.password,
    }

let signInResult = await signInUser(userDetails)


respObj = {
    jwt: await signInResult.user.getIdToken(),
    refreshToken: signInResult.user.refreshToken,
    displayName: signInResult.user.displayName
}


res.json(respObj)

})
   

module.exports = routes;