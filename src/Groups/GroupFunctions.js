const { Message } = require('../database/schemas/MessagesSchema')
const {Group} = require('../database/schemas/GroupSchema')
const firebaseAdmin = require('firebase-admin')

// get group message history
async function getHistory(groupDetails){
    try{
        let historyResult = await Message.find({groupId: groupDetails.groupId})
        return historyResult
    }catch (e){
        return {
            error: e
        }
    }
}

// create a group 
async function createGroup(groupDetails){
    try{
        let newGroup = new Group({
            userIds: [groupDetails.userId],
            groupName: groupDetails.groupName
        })
        let groupResult = await newGroup.save()
        return groupResult

    }catch(e){
        return {
            error: e
        }
    }
}

// get user's group
async function getUserGroup(userDetails){
    try{
        let userGroups = await Group.find({userIds:userDetails.userId})
        return userGroups
    } catch(e){
        return {error: e}
    }
}

// add user to a group
async function addUserToGroup(groupDetails){
    try{
        // use friend's email from firebase to get the user id
        let userRecord = await firebaseAdmin.auth().getUserByEmail(groupDetails.userEmail)
        
        // find the group I want add the uer to from mongoDB
        let userGroup = await Group.findById(groupDetails.groupId) 
        
        // check if user is already in the group
        if (!userGroup.userIds.includes(userRecord.uid)){
            userGroup.userIds.push(userRecord.uid)
            await userGroup.save()
            return userGroup
        }else {
            throw {"error":'you can\'t do this! user is already in this group'}
        }
    } catch(e){
        if(e.code == "auth/user-not-found"){
            return({error: "user not found"})
        }else {
            return {error: e}
        }
    }
}

// user leave a group 
async function leaveGroup(userDetails){
    try{
        let groupRecord = await Group.findById(userDetails.groupId)
        let usersInGroup = groupRecord["userIds"]
        if (usersInGroup.length > 1){
            let updatedUsersInGroup = usersInGroup.remove(userDetails.userId)
            groupRecord.userIds = updatedUsersInGroup // update the groupRecord
            await groupRecord.save()
            return groupRecord
        } else {
            throw {"error": "You can't leave this group, because you are the only one in this group"}
        } 
    } catch(e){
        return {error: e}
    }
}

module.exports = {
    getHistory,
    createGroup,
    getUserGroup,
    addUserToGroup,
    leaveGroup
}
