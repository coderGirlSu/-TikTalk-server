const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    message: String,
    displayName: String
});


const Message = mongoose.model('Message', MessageSchema);

module.exports = {Message}