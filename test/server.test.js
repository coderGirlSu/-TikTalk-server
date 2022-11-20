const mongoose = require('mongoose')
const request = require('supertest')
const {app} = require('../src/server')

// establish a connection to the database
const { databaseConnector, databaseDisconnector } = require('../src/database')
const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/TikTalkTestDatabase'

// set up before-tests and after-tests operations
beforeEach(async()=> {
    await databaseConnector(DATABASE_URI)
})

afterEach(async () => {
    await databaseDisconnector()
})

// ---------- tests -----------------------

describe('server homepage', () => {
    const expected = 'Hello'
    it("shows a hello message", async ()=> {
        const res = await request(app).get('/')
        expect(res.statusCode).toEqual(200)
        expect(res.text).toEqual(expect.stringContaining(expected))
    })
})

describe('sign up', () => {
    it("lets user sign up", async ()=> {
        const res = await request(app).post('/users/sign-up').send({
            email:"test@test.com",
            username:"some_username",
            password:"some_password"
        })
        expect(res.statusCode).toEqual(200)
    })
})

describe('sign in', () => {
    it("lets user sign in", async () => {
        const res = await request(app).post('/users/sign-in').send({
            email:"test@test.com",
            password:"some_password"
        })
        expect(res.statusCode).toEqual(200)
    })
})

describe('send message', () => {
    it("lets user send message", async () => {
        const res = await request(app).post('/messages/').send({
        message: "some_message",
        senderId: "some_senderId",
        groupId: "some_groupId",
        senderName: "some_senderName"
        })
        expect(res.statusCode).toEqual(200)
    })
})

describe('get group message history', () => {
    it("lets user get group message history", async () => {
        const res = await request(app).get('/groups/history')
        expect(res.statusCode).toEqual(200)
    })
})

describe('create a group', () => {
    it("lets user create a group", async () => {
        const res = await request(app).post('/groups/create').send({
            userIds: "some_uerId",
            groupName: "some_groupName"
        })
        expect(res.statusCode).toEqual(200)
    })
})

describe('get user groups', () => {
    it("lets user get all groups that user is in", async () => {
        const res = await request(app).get('/groups/')
        expect(res.statusCode).toEqual(200)
    })
})

describe('add user to a group', () => {
    it("lets user add friend to a group", async () => {
        const res = await request(app).patch('/groups/add').send({
            groupId: "some_groupId", // why still pass even i don't send any information
            userEmail: "sme_email"
        })
        expect(res.statusCode).toEqual(200)
    })
})

describe('leave a group', () => {
    it("lets user leave a group", async () => {
        const res = await request(app).patch('/groups/leave').send({
            groupId: "some_groupId",
            userId: "some_user_uid"
        })
        expect(res.statusCode).toEqual(200)
    })
})