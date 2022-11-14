const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    message: String,
    senderId: String,
    groupId: String
},{timestamps: true});


const Message = mongoose.model('Message', MessageSchema);

module.exports = {Message}