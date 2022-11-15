const {Group} = require('../database/schemas/GroupSchema')
const { Message } = require('../database/schemas/MessagesSchema')

async function getHistory(groupDetails){

    let historyResult = await Message.find({groupId: groupDetails.groupId})
    return historyResult

}

module.exports = {
    getHistory
}
