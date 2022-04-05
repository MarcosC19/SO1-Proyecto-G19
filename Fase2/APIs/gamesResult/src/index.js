const express = require('express')
const app = express()
const cors = require('cors')
const socketIO = require('socket.io')

const connection = require('../database/tidb')

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
    
    socket.on('lastTenGames', async () => {
        connection.query(
            `SELECT 
                id, game_id, game_name
            FROM
                fase2
            ORDER BY id DESC
            LIMIT 10;`,
            (err, result) => {
                if (err) {
                    socket.emit('Error', err)
                } else{
                    socket.emit('lastTenGamesResult', result)
                }
            }
        )
    });

    socket.on('bestPlayers', async () => {
        connection.query(
            `SELECT 
                winner, COUNT(winner) AS 'Victorias'
            FROM
                fase2
            GROUP BY winner
            ORDER BY Victorias DESC
            LIMIT 10;`,
            (err, result) => {
                if (err) {
                    socket.emit('Error', err)
                } else{
                    socket.emit('bestPlayersResult', result)
                }
            }
        )
    });

    socket.on('statsPlayer', async (player) => {
        connection.query(
            `SELECT 
                id, game_name, winner, 'Ganador' AS 'resultado'
            FROM
                fase2
            WHERE
                winner = ${player} 
            UNION SELECT 
                id, game_name, ${player}, 'Perdedor' AS 'resultado'
            FROM
                fase2
            WHERE
                winner != ${player}
            ORDER BY id ASC;`,
            (err, result) => {
                if (err) {
                    socket.emit('Error', err)
                } else{
                    socket.emit('statsPlayerResult', result)
                }
            }
        )
    });
})