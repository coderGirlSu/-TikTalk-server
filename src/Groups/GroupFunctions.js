const { Message } = require('../database/schemas/MessagesSchema')
const {Group} = require('../database/schemas/GroupSchema')

// get group message history
async function getHistory(groupDetails){

    let historyResult = await Message.find({groupId: groupDetails.groupId})
    return historyResult
}

// create a group 
async function createGroup(groupDetails){
    let newGroup = new Group({
        userIds: [groupDetails.userId],
        groupName: groupDetails.groupName
    })

    let groupResult = await newGroup.save()

    return groupResult
}

async function getUserGroup(userDetails){
    let userGroups = await Group.find({userIds:userDetails.userId})
    return userGroups
}

module.exports = {
    getHistory,
    createGroup,
    getUserGroup
}
