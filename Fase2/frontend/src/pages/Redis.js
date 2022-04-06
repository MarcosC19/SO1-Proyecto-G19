import React, { useEffect } from 'react'
import '../css/Redis.css'
import socketRedis from '../Sockets/redis'

import NavBar from '../components/NavBar'

export default function Redis(){

    useEffect(() => {
        socketRedis.emit('lastTenGames')
        socketRedis.on('lastTenGamesResult', (data) => {
            console.log(data)
        })

        socketRedis.emit('bestPlayers')
        socketRedis.on('bestPlayersResult', (data) => {
            console.log(data)
        })

        socketRedis.emit('statsPlayer', 1)
        socketRedis.on('statsPlayerResult', (data) => {
            console.log(data)
        })
        
    }, [])

    return(
        <div>
            <NavBar/>
            <h1>Pagina Redis</h1>
        </div>
    )
}