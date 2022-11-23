const request = require('supertest') // help to test servers (api request)
const {app, getCredentials} = require('../src/server')
const {getAuth, signInWithEmailAndPassword} = require ("firebase/auth")
const firebaseAdmin = require('firebase-admin')

// establish a connection to the database
//Test user 1
const testUsername1 = "testing21@test.com"
const testPassword1 = "111111"
let token1 = ""
let userID1 = ""
let userName1 = ""
let userEmail1 = ""
//Test user 2
const testUsername2 = "testing20@test.com"
const testPassword2 = "111111"
let token2 = ""
let userID2 = ""
let userName2 = ""
let userEmail2 = ""

// jest set up and cleaning up operations
// connect to database
// get token and user details
beforeAll(async()=> {
    //await databaseConnector(DATABASE_URI)
    const auth = getAuth() 
    let signInResult1 = await signInWithEmailAndPassword(auth, testUsername1, testPassword1)
    token1 = await signInResult1.user.getIdToken()
    userID1 = signInResult1.user.uid
    userName1 = signInResult1.user.displayName
    userEmail1 = signInResult1.user.email

    let signInResult2 = await signInWithEmailAndPassword(auth, testUsername2, testPassword2)
    token2 = await signInResult2.user.getIdToken()
    userID2 = signInResult2.user.uid
    userName2 = signInResult2.user.displayName
    userEmail2 = signInResult2.user.email
})

// disconnect to database after test
afterEach(async () => { 
    //await databaseDisconnector()
})

// ---------------- tests -----------------------

// describe('server homepage', () => {
//     const expected = 'Hello'
//     it("shows a hello message", async ()=> {
//         const res = await request(app).get('/')
//         expect(res.statusCode).toEqual(200)
//         expect(res.text).toEqual(expect.stringContaining(expected))
//     })
// })

// sign up test
describe('sign up', () => {
    it("lets user sign up", async ()=> {
        const random = Math.round(new Date() / 1000).toString()
        const res = await request(app).post('/users/sign-up').send({
            email: `${random}@${random}.com`,
            username: random,
            password:"111111"
        })
        expect(res.statusCode).toEqual(200)
    })
})

describe('sign up with invalid password', () => {
    it("does not let user sign up", async ()=> {
        const random = Math.round(new Date() / 1000).toString()
        const res = await request(app).post('/users/sign-up').send({
            email: `${random}@${random}.com`,
            username: random,
            password:""
        })
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual(expect.stringContaining("Invalid password"))
    })
})

describe('sign up with invalid email', () => {
    it("does not let user sign up", async ()=> {
        const res = await request(app).post('/users/sign-up').send({
            email: "",
            username: "",
            password:"111111"
        })
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual(expect.stringContaining("Invalid email address"))
    })
})

describe('sign up that already exists', () => {
    it("does not let user sign up", async ()=> {
        const res = await request(app).post('/users/sign-up').send({
            email: testUsername1,
            username:testUsername1,
            password:testPassword1
        })
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual(expect.stringContaining("already exists"))
    })
})

// sign in tests
describe('sign in', () => {
    it("lets user sign in", async () => {
        const res = await request(app).post('/users/sign-in').send({
            email: testUsername1,
            password: testPassword1
        })
        expect(res.statusCode).toEqual(200)
    })
})

describe('sign in with unknown email address', () => {
    it("does not let user sign in", async () => {
        const random = Math.round(new Date() / 1000).toString()
        const res = await request(app).post('/users/sign-in').send({
            email:`${random}@${random}.com`,
            password:"some_password"
        })
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual(expect.stringContaining("User not found"))
    })
})

describe('sign in with empty password', () => {
    it("does not let user sign in", async () => {
        const res = await request(app).post('/users/sign-in').send({
            email:testUsername1,
            password:""
        })
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual(expect.stringContaining("Invalid password"))
    })
})

describe('sign in with wrong password', () => {
    it("does not let user sign in", async () => {
        const res = await request(app).post('/users/sign-in').send({
            email:testUsername1,
            password:"1"
        })
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual(expect.stringContaining("Wrong password"))
    })
})

describe('sign in with invalid email', () => {
    it("does not let user sign in", async () => {
        const res = await request(app).post('/users/sign-in').send({
            email:"",
            password:"some_password"
        })
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual(expect.stringContaining("Invalid email"))
    })
})

// messages tests
describe('send message', () => {
    it("lets user send message", async () => {
        const res = await request(app).post('/messages/')
            .set({ "Authorization": "Bearer " + token1 })
            .send({
                message: "some_message",
                senderId: userID1,
                groupId: "some_groupId",
                senderName: userName1
                })
        expect(res.statusCode).toEqual(200)
    })
})

describe('get group message history', () => {
    it("lets user get group message history", async () => {
        const res = await request(app).get('/groups/history')
            .set({"Authorization": "Bearer " + token1})
        expect(res.statusCode).toEqual(200)
    })
})

// group tests
describe('create a group', () => {
    it("lets user create a group", async () => {
        const res = await request(app).post('/groups/create')
            .set({"Authorization":"Bearer " + token1})
            .send({
                userIds: userID1,
                groupName: "some_groupName"
            })
        expect(res.statusCode).toEqual(200)
    })
})

describe('get user groups', () => {
    it("lets user get all groups that user is in", async () => {
        const res = await request(app).get('/groups/')
            .set({"Authorization":"Bearer " + token1})
        expect(res.statusCode).toEqual(200)
    })
})

describe('add user to a group', () => {
    it("lets user add friend to a group", async () => {
        const res = await request(app).patch('/groups/add')
            .set({"Authorization":"Bearer " + token1})
            .send({
                groupId: "some_groupId",
                userEmail: userEmail1
            })
        expect(res.statusCode).toEqual(200)
    })
})

describe('leave a group', () => {
    it("lets user leave a group", async () => {
        // Create a group as test user 1
        const createRes = await request(app).post('/groups/create')
        .set({"Authorization":"Bearer " + token1})
        .send({
            groupName: "test group"
        })
        const groupID = createRes.body._id
        //add test user 2 to the group so that there are 2 users in the group
        const addRes = await request(app).patch('/groups/add')
        .set({"Authorization":"Bearer " + token1})
        .send({
            groupId: groupID,
            email: userEmail2
        })
        // remove user 1 from the group
        const res = await request(app).patch('/groups/leave')
        .set({"Authorization":"Bearer " + token1})
        .send({
            groupId: groupID
        })
        expect(res.statusCode).toEqual(200)
    })
})

describe('leave a group if you are the only member should fail', () => {
    it("lets user leave a group", async () => {
        // Create a group
        const createRes = await request(app).post('/groups/create')
        .set({"Authorization":"Bearer " + token1})
        .send({
            groupName: "test group"
        })
        const groupID = createRes.body._id
        const res = await request(app).patch('/groups/leave')
        .set({"Authorization":"Bearer " + token1})
        .send({
            groupId: groupID,
            userId: userID1
        })
        expect(res.statusCode).toEqual(400)
    })
})

// token test
describe('send message with invalid token', () => {
    it("lets user send message", async () => {
        const res = await request(app).post('/messages/')
            .set({ "Authorization": "Bearer " + "invaild" })
            .send({
                message: "some_message",
                senderId: userID1,
                groupId: "some_groupId",
                senderName: userName1
                })
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual(expect.stringContaining("invalid token"))
    })
})
