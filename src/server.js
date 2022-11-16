const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const {databaseConnector} = require('./database')

// read key-values from .env file and set them as environment variables
require('dotenv').config()

const PORT = process.env.PORT || 0
const HOST = '0.0.0.0'

// catches any unhandled rejections(which are failed promises)
void process.on('unhandledRejection', (reason, p) => {
    console.log(`Things got pretty major here! Big error:\n`+ p);
    console.log(`That error happened because of:\n` + reason);
});

// Use the helmet library to protect the code
app.use(helmet())
app.use(helmet.permittedCrossDomainPolicies())
app.use(helmet.referrerPolicy())
app.use(helmet.contentSecurityPolicy({
    directives:{
        defaultSrc:["self"]
    }
}))

// configure express receiving & sending in JSON format
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// configure cors and use it
// var corsOptions = {
//     origin:["http://localhost:3000", "http://netlify.blah"],
//     optionsSuccessStatus: 200
// }
app.use(cors())


const firebaseAdmin = require('firebase-admin')
firebaseAdmin.initializeApp({
    credential:firebaseAdmin.credential.cert({
        "projectId":process.env.FIREBASE_ADMIN_PROJECT_ID,
        "privateKey":process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "clientEmail":process.env.FIREBASE_ADMIN_CLIENT_EMAIL
    })
})


if(process.env.NODE_ENV != "test"){
    const DATABASE_URI = process.env.DATABASE_URI
    console.log("connecting to " + DATABASE_URI)
    databaseConnector(DATABASE_URI).then(()=>{
        console.log("Database connected!")
    }).catch(error=>{
        console.log(`some error occurred , it was${error}`)
    })
}



// ------------------- Routes-------------------------
// server behaviour
app.get('/', (req, res) => {
    console.log('ExpressJS API homepage received a request.')
    const target = process.env.NODE_ENV || 'not yet set'
    res.json({
        'message':`Hello ${target} world!`
    })
    res.send('')
})

const importedUserRouting = require('./Users/UserRoutes')
app.use('/users', importedUserRouting)

const importedMessageRouting = require('./Messages/MessageRoutes')
app.use('/messages', importedMessageRouting)

const importedGroupRouting = require('./Groups/GroupRoutes')
app.use('/groups',importedGroupRouting)


module.exports = {
    app, PORT, HOST
}