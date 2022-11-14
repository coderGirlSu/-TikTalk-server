const {Message} = require('../database/schemas/MessagesSchema')

async function sendMessage(userMessage){
    let newMessage = new Message({ // create a new instance of message use MessagesSchema
        message: userMessage.message,
        displayName: userMessage.username
    })

    let messageResult = await newMessage.save()
    return messageResult
}

module.exports = {
    sendMessage
}