var {app, PORT, HOST} = require('./server')

const server = app.listen(PORT, HOST, () => {
    if (server.address().port != PORT) { // The server address is an external IP address that connects your computer to the Internet Service Provider (ISP), enabling access to various domains worldwide.
        PORT = server.address().port
    }
    console.log(`
    ExpressJS server is now running!
    Server address mapping is:
    
    HOST: ${HOST}
    PORT: ${PORT}
    Congrats!
    `)

})