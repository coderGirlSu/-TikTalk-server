const express = require('express')
const routes = express.Router()
const {getHistory} = require('./GroupFunctions')
const {validateToken} = require('../Users/UserFunctions')
const {createGroup} = require('./GroupFunctions')
const {getUserGroup} = require('./GroupFunctions')

// get group message history
routes.get('/history', async(req,res)=>{
    // check user token
    let userToken = await validateToken(req.headers.authorization)
    if (userToken == null){
        res.json({"error": "invalid token"})
        return
    }

    let groupDetails = {
        groupId: req.body.groupId
    }
    let getHistoryResult = await getHistory(groupDetails)

    // console.log(getHistoryResult)
    res.json(getHistoryResult)
})

// create a group
routes.post('/create', async(req, res)=>{
    let userToken = await validateToken(req.headers.authorization)
    if (userToken == null){
        res.json({"error":"invalid token"})
        return
    }

    let groupDetails = {
        userId: userToken.uid,
        groupName: req.body.groupName
    }
    
    let newGroup = await createGroup(groupDetails)
    // console.log(newGroup)
    res.json(newGroup)
})

// get all groups that the current user is in
routes.get('/', async(req, res)=>{
    let userToken = await validateToken(req.headers.authorization)
    if(userToken == null) {
        res.json({"error":"invalid token"})
        return
    }

    let userDetails = {
        userId: userToken.uid
    }

    let userGroupResult = await getUserGroup(userDetails)

    res.json(userGroupResult)
} )

module.exports = routes