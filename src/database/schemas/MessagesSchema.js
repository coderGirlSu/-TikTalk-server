const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
    message: String,
    senderId: String,
    groupId: String,
    senderName: String
},{timestamps: true});


const Message = mongoose.model('Message', MessagesSchema);

module.exports = {Message}