// dependecies
const express = require('express')
const app = express()
const cors = require('cors')
const socketIO = require('socket.io')

// settings
app.set('port', process.env.PORT || 5000)
app.use(express.json())
app.use(require('./routes/router'))
app.use(cors())

// starting server
const server = app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})

// creating socket
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})

// web sockets
io.on('connection', (socket) => {
    console.log(`Nueva conexion con ${socket.id}`)
})