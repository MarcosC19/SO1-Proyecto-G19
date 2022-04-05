const express = require('express')
const app = express()
const cors = require('cors')
const socketIO = require('socket.io')

// settings
app.set('port', process.env.PORT || 8080)
app.use(express.json())
app.use(cors())
app.use(require('./routes/router'))

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

// web socket redis
io.of('/resultRedis').on('connection', async (socket) => {
    console.log(`Nueva conexion para redis con ${socket.id}`)
})

// web socket tiDB
io.of('/resultTiDB').on('connection', async (socket) => {
    console.log(`Nueva conexion para TiDB con ${socket.id}`)
})