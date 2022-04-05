import React, { useEffect } from 'react'
import '../css/TiDB.css'
import socketTidb from '../Sockets/tidb'

import NavBar from '../components/NavBar'

export default function TiDB(){

    useEffect(() => {
        socketTidb.emit('results')
    }, [])

    return(
        <div>
            <NavBar/>
            <h1>Pagina TiDB</h1>
        </div>
    )
}