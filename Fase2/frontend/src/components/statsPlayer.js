import React from "react";
import { Table } from 'reactstrap'

export default function StatsPlayer(props) {
    const statsPlayer = props.data

    const uudi = require('uuid')
    return (
        <div>            
            <center><h3>Estadisticas Jugador</h3></center>
            <Table>
                <thead>
                    <tr>
                        <th>Game Name</th>
                        <th>Jugador</th>
                        <th>Resultado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        statsPlayer.map(valor => {
                            return (
                                <tr key={uudi.v4()}>
                                    <td>{valor.game_name}</td>
                                    <td>{valor.winner}</td>
                                    <td>{valor.resultado}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}