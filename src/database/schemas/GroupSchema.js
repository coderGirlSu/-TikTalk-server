const mongoose = require('mongoose')

const GroupSchema = new mongoose.Schema({
    groupId: String
},{timestamps: true})

const Group = mongoose.model('Group', GroupSchema)

module.exports = {Group}