import React from "react";
import { Table } from 'reactstrap'

export default function BestPlayers(props){
    const uudi = require('uuid')
    const bestPlayers = props.data

    return(
        <div>
                <center><h3>Mejores Jugadores</h3></center>
                <Table>
                    <thead>
                        <tr>
                            <th>Jugador</th>
                            <th>Victorias</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bestPlayers.map(valor => {
                                return (
                                    <tr key={uudi.v4()}>
                                        <td>{valor.winner}</td>
                                        <td>{valor.victorias}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
    )
}