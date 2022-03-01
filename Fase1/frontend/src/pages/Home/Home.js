import React from "react";
import './Home.css';
import NavBar from "../../components/NavBar/NavBar";
import { Table } from 'reactstrap';

export default function Home() {

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
                    
                </tbody>
            </Table>
        </div>
    )
}