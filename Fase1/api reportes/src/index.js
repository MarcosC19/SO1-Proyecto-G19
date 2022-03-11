// dependecies
const express = require('express')
const app = express()
const cors = require('cors')
const socketIO = require('socket.io')
const { mongoose } = require('./database')
const logs = require('./models/registros')

const whiteList = ["http://localhost:3000"]

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whiteList.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error("Not allowed by CORS"))
        }
      },
      credentials: true,
}

// settings
app.set('port', process.env.PORT || 8080)
app.use(express.json())
app.use(cors(corsOptions))

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