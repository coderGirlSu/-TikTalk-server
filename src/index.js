var {httpServer, httpsServer} = require('./server')



if (process.env.USE_HTTPS == "true") {
    httpServer.listen(process.env.HTTPS_PORT, () => {
        console.log("Running HTTPS TikTalk 💬 server on port " + process.env.HTTPS_PORT)
    })
} else {
    httpServer.listen(process.env.HTTP_PORT, () => {
        console.log("Running HTTP TikTalk 💬 server on port " + process.env.HTTP_PORT)
    })
}