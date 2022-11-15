const express = require('express')
const routes = express.Router()
const {sendMessage} = require('./MessageFunctions')
const {validateToken} = require('../Users/UserFunctions')

// send a message
routes.post('/', async(req, res)=>{
    // check if the token is valid and get the user details
    let userToken = await validateToken(req.headers.authorization) 
    // if no details are returned then the token was invalid, should stop
    if (userToken == null) {
        res.json({"error": "invalid token"})
        return
    }

    // otherwise, carry on and send the message
    let newMessage = {
        message: req.body.message,
        senderId: userToken.uid,
        groupId: req.body.groupId
    }

    let sendMessageResult = await sendMessage(newMessage)

    // console.log(sendMessageResult)
        
    res.json(sendMessageResult)
})

module.exports = routes