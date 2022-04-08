import React from "react";
import { Table } from 'reactstrap'

export default function LastGames(props){
    const lastGames = props.data

    return(
        <div>
                <center><h3>Ultimos 10 Juegos</h3></center>
                <Table>
                    <thead>
                        <tr>
                            <th>Game Id</th>
                            <th>Game Name</th>
                            <th>Winner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lastGames.map(valor => {
                                return (
                                    <tr key={valor.id}>
                                        <td>{valor.game_id}</td>
                                        <td>{valor.game_name}</td>
                                        <td>{`Jugador ${valor.winner}`}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
    )
}