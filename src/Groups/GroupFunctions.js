const { Message } = require('../database/schemas/MessagesSchema')
const {Group} = require('../database/schemas/GroupSchema')
const firebaseAdmin = require('firebase-admin')
const {getAuth} = require ("firebase/auth")
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

// get user's group
async function getUserGroup(userDetails){
    let userGroups = await Group.find({userIds:userDetails.userId})
    return userGroups
}

// add user to a group
async function addUserToGroup(groupDetails){

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
    return {"error":'you can\'t do this! user is already in this group'}
   }
     
    // .then((getUsersResult) => {
    //   console.log('Successfully fetched user data:');
    //   getUsersResult.users.forEach((userRecord) => {
    //     console.log(userRecord);
    //   });
  
    //   console.log('Unable to find users corresponding to these identifiers:');
    //   getUsersResult.notFound.forEach((userIdentifier) => {
    //     console.log(userIdentifier);
    //   });
    // })
    // .catch((error) => {
    //   console.log('Error fetching user data:', error);
    // });
}

// remove a user from a group 
async function leaveGroup(userDetails){
    let groupRecord = await Group.findById(userDetails.groupId)
    let usersInGroup = groupRecord["userIds"]
    let updatedUsersInGroup = usersInGroup.remove(userDetails.userId)
    groupRecord.userIds = updatedUsersInGroup // update the groupRecord
    await groupRecord.save()
    return groupRecord
}

module.exports = {
    getHistory,
    createGroup,
    getUserGroup,
    addUserToGroup,
    leaveGroup
}
