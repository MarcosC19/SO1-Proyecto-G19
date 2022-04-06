const express = require('express')
const app = express()
const cors = require('cors')
const socketIO = require('socket.io')

const connection = require('../database/tidb')
const clientRedis = require('../database/redis');

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

    // ULTIMOS 10 JUEGOS JUGADOS
    socket.on('lastTenGames', async () => {
        await clientRedis.connect()

        let dataAux = []

        const result = await clientRedis.KEYS('*')

        for await(let value of result) {

            if (!value.includes('backup')){
                
                let data = await clientRedis.get(value)

                let jsonData = JSON.parse(data)

                dataAux.push(jsonData)
            }
        }

        while (dataAux.length > 10) {
            dataAux.shift()
        }

        socket.emit('lastTenGamesResult', dataAux)
    });

    // MEJORES 10 JUGADORES
    socket.on('bestPlayers', async () => {

        let dataAux = []

        const result = await clientRedis.KEYS('*')

        for await(let value of result) {

            if (!value.includes('backup')){
                
                let data = await clientRedis.get(value)

                let jsonData = JSON.parse(data)

                dataAux.push(jsonData)
            }
        }

        let dataAux2 = []

        for await(let value of dataAux){
            let victorys = 1
            for await(let value2 of dataAux2){
                if (value2.winner == value.winner){
                    victorys ++;
                }
            }
            
            let jsonAux = {
                'winner': value.winner,
                'victorias': victorys
            }

            dataAux2.push(jsonAux)            
        }

        let dataFinal = []
        for await(let value of dataAux2){
            let aux = value
            for await(let value2 of dataAux2){
                if (value.winner == value2.winner && value2.victorias > value.victorias){
                    aux = value2
                }
            }
            
            if (!dataFinal.includes(aux)){
                dataFinal.push(aux)
            }
        }

        dataFinal.sort((a,b) => {
            return b.victorias - a.victorias
        })

        while (dataFinal.length > 10) {
            dataFinal.pop()
        }

        socket.emit('bestPlayersResult', dataFinal)
    });

    // ESTADISTICAS DE UN JUGADOR
    socket.on('statsPlayer', async (player) => {
        let dataAux = []

        const result = await clientRedis.KEYS('*')

        for await(let value of result) {

            if (!value.includes('backup')){
                
                let data = await clientRedis.get(value)

                let jsonData = JSON.parse(data)

                dataAux.push(jsonData)
            }
        }

        let dataFinal = []

        for await(let value of dataAux){
            if (value.winner == player){
                let jsonData = {
                    'id': 'id' + (new Date()).getTime(), 
                    'game_name': value.game_name, 
                    'winner': value.winner,
                    'resultado': 'Ganador'
                }
                dataFinal.push(jsonData)
            } else{
                let jsonData = {
                    'id': 'id' + (new Date()).getTime(), 
                    'game_name': value.game_name, 
                    'winner': player,
                    'resultado': 'Perdedor'
                }
                dataFinal.push(jsonData)
            }
        }

        socket.emit('statsPlayerResult', dataFinal)

        await clientRedis.disconnect()
    });
})

// web socket tiDB
io.of('/resultTiDB').on('connection', async (socket) => {
    console.log(`Nueva conexion para TiDB con ${socket.id}`)
    
    // ULTIMOS 10 JUEGOS JUGADOS
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

    // MEJORES 10 JUGADORES
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

    // ESTADISTICAS DE UN JUGADOR
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