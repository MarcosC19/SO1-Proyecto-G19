import React, { useEffect, useState } from "react";
import './Home.css';
import NavBar from "../../components/NavBar/NavBar";
import { Table } from 'reactstrap';
import socket from "../../socket/Socket";

export default function Home() {

    const [data, setData] = useState([])

    useEffect(() => {     
        socket.emit('logs')
        socket.on('setlogs', (logs) => {
            setData(logs)
        })
    }, [])
    return (
        <div id="body">
            <NavBar/>
            <br/>
            <Table>
                <thead>
                    <tr>
                        <th>Nombre VM</th>
                        <th>Endpoint</th>
                        <th>Data</th>
                        <th>Fecha y Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(valor => {
                            let date = new Date(valor.timestamp)
                            return(
                                <tr key={valor._id}>
                                    <td>{`VM${valor.logorigin}`}</td>
                                    <td>{`/get${valor.logtype}status`}</td>
                                    <td>{valor.logcontent}</td>
                                    <td>{date.toLocaleString()}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}