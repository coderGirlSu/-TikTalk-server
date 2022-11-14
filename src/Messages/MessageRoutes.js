const express = require('express')
const routes = express.Router()

const {sendMessage} = require('./MessageFunctions')

routes.post('/', async(req, res)=>{

    let newMessage = {
        message: req.body.message,
        displayName: req.body.username,
    }
    
    let sendMessageResult = await sendMessage(newMessage)
        
    // console.log(sendMessageResult.message)
    res.json(sendMessageResult.message)
})

module.exports = routes