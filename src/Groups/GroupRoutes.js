const express = require('express')
const routes = express.Router()
const {getHistory} = require('./GroupFunctions')
const {validateToken} = require('../Users/UserFunctions')
const {createGroup} = require('./GroupFunctions')
const {getUserGroup} = require('./GroupFunctions')
const {addUserToGroup} = require('./GroupFunctions')
const {leaveGroup} = require('./GroupFunctions')

// get group message history
routes.get('/history', async(req,res)=>{
    // check user token
    let userToken = await validateToken(req.headers.authorization, res)
    if (userToken == null) return

    let groupDetails = {
        groupId: req.query.groupId
    }
    let getHistoryResult = await getHistory(groupDetails)

    res.json(getHistoryResult)
})

// create a group
routes.post('/create', async(req, res)=>{
    let userToken = await validateToken(req.headers.authorization, res)
    if (userToken == null) return

    let groupDetails = {
        userId: userToken.uid,
        groupName: req.body.groupName
    }
    
    let newGroup = await createGroup(groupDetails)
    res.json(newGroup)
})

// get all groups that the current user is in
routes.get('/', async(req, res)=>{
    let userToken = await validateToken(req.headers.authorization, res)
    if (userToken == null) return

    let userDetails = {
        userId: userToken.uid
    }
    let userGroupResult = await getUserGroup(userDetails)

    res.json(userGroupResult)
} )

// add user to a group
routes.patch('/add', async(req, res)=>{
    let userToken = await validateToken(req.headers.authorization, res)
    if (userToken == null) return

    let groupDetails = {
        groupId: req.body.groupId,
        userEmail: req.body.email
    }

    let addUserResult = await addUserToGroup(groupDetails)
    res.json(addUserResult)
})

// leave a group
routes.patch('/leave', async(req, res)=>{
    let userToken = await validateToken(req.headers.authorization, res)
    if (userToken == null) return

    let userDetails = {
        groupId: req.body.groupId,
        userId: userToken.uid
    }
   
    let leaveGroupResult = await leaveGroup(userDetails)

    let status = 200
    if (leaveGroupResult.error) {
        status = 400
    }
    res.status(status).json(leaveGroupResult)
    
})


module.exports = routes