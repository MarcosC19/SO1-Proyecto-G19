import React, { useEffect } from 'react'
import '../css/Redis.css'
import socketRedis from '../Sockets/redis'

import NavBar from '../components/NavBar'

export default function Redis(){

    useEffect(() => {
        socketRedis.emit('results')
    }, [])

    return(
        <div>
            <NavBar/>
            <h1>Pagina Redis</h1>
        </div>
    )
}