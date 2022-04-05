import React, { useEffect } from 'react'
import '../css/TiDB.css'
import socketTidb from '../Sockets/tidb'

import NavBar from '../components/NavBar'

export default function TiDB(){

    useEffect(() => {
        socketTidb.emit('lastTenGames')
        socketTidb.on('lastTenGamesResult', (results) => {
            console.log(results)
        })

        socketTidb.emit('bestPlayers')
        socketTidb.on('bestPlayersResult', (results) => {
            console.log(results)
        })

        socketTidb.emit('statsPlayer', 1)
        socketTidb.on('statsPlayerResult', (results) => {
            console.log(results)
        })
    }, [])

    return(
        <div>
            <NavBar/>
            <h1>Pagina TiDB</h1>
        </div>
    )
}