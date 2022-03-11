// dependecies
const express = require('express')
const app = express()
const cors = require('cors')
const socketIO = require('socket.io')
const { mongoose } = require('./database')
const logs = require('./models/registros')

// settings
app.set('port', process.env.PORT || 8080)
app.use(express.json())
app.use(cors())

// starting server
const server = app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})

// creating socket
const io = socketIO(server, {
    cors: {
        origin: "*",
        credentials: true
    }
})

// web sockets
io.of('/getLogs').on('connection', async (socket) => {
    console.log(`Nueva conexion con ${socket.id}`)

    socket.on('logs', async () => {
        const allLogs = await logs.find();
        
        socket.emit('setlogs', allLogs);
    })
})