const express = require('express')
const routes = express.Router()
const {sendMessage} = require('./MessageFunctions')
const {validateToken} = require('../Users/UserFunctions')

// send a message
routes.post('/', async(req, res)=>{
    // check if the token is valid and get the user details
    let userToken = await validateToken(req.headers.authorization, res) 
    // if no details are returned then the token was invalid, should stop
    if (userToken == null) return
    
    // otherwise, carry on and send the message
    // create an JS object
    let newMessage = {
        message: req.body.message,
        senderId: userToken.uid,
        groupId: req.body.groupId,
        senderName: userToken.name
    }

    let sendMessageResult = await sendMessage(newMessage)
        
    res.json(sendMessageResult)
})

module.exports = routes