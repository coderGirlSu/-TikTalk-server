const express = require('express')
const routes = express.Router()
const {getHistory} = require('./GroupFunctions')
const {validateToken} = require('../Users/UserFunctions')


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

    console.log(getHistoryResult)

    res.json(getHistoryResult)
})

module.exports = routes