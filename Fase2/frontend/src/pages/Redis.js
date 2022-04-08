import React, { useEffect, useState } from 'react'
import '../css/Redis.css'
import socketRedis from '../Sockets/redis'
import socketTidb from '../Sockets/tidb'

import NavBar from '../components/NavBar'
import LastGames from '../components/lastGames'
import BestPlayers from '../components/bestPlayers'
import StatsPlayer from '../components/statsPlayer'

export default function Redis() {
    const uudi = require('uuid')

    const [lastGames, setLastGames] = useState([])

    const [bestPlayers, setBestPlayers] = useState([])

    const [players, setPlayers] = useState([])

    const [player, setPlayer] = useState(1)

    const [statsPlayer, setStatsPlayer] = useState([])

    useEffect(() => {
        socketRedis.emit('lastTenGames')
        socketRedis.on('lastTenGamesResult', (results) => {
            setLastGames(results)
        });

        socketRedis.emit('bestPlayers')
        socketRedis.on('bestPlayersResult', (results) => {
            setBestPlayers(results)
        });

        socketRedis.emit('statsPlayer', player)
        socketRedis.on('statsPlayerResult', (results) => {
            setStatsPlayer(results)
        });

        socketTidb.emit('players', player)
        socketTidb.on('totalPlayers', (results) => {
            setPlayers(results)
        });

        socketRedis.emit('players', player)
        socketRedis.on('totalPlayers', (results) => {
            setPlayers(results)
        });

    }, [player])

    return (
        <div>
            <NavBar />
            <br/>
            <LastGames data= {lastGames}/>
            <BestPlayers data = {bestPlayers}/>
            <select value = {player} onChange={(e) => {
                setPlayer(parseInt(e.target.value))
            }}>
                {
                    players.map(value => {
                        return (
                            <option key={uudi.v4()} value={value.winner}>{`Jugador ${value.winner}`}</option>
                        )
                    })
                }
            </select>
            <StatsPlayer data = {statsPlayer}/>
            
        </div>
    )
}