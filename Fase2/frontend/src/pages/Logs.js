import React,{useRef, useState, useEffect} from 'react';
import '../css/Logs.css';
import DataTable from 'react-data-table-component';
import NavBar from '../components/NavBar';

const RUST_API_HOST = "https://rust-api-4waihun6ya-uc.a.run.app";

const columns = [
    {
        name: 'Nombre del Juego',
        selector: row => row.game_name,
    },
    {
        name: 'Ganador',
        selector: row => row.winner,
    },
    {
        name: 'Ruta',
        selector: row => row.queue,
    },
];

export default function Logs(){

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        console.log("Fetching Logs Data");
        getLogs();


    },[]);

    const getLogs = async() => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(`${RUST_API_HOST}/getLogs/`, options);
        const body = await response.json();

        if(response.status !== 200){
            console.log("Error fetching data...");
            throw Error(body.message);
        }

        return body;
    }




    return(
        <div>
            <NavBar/>
            <h1>Pagina Logs</h1>

            <DataTable
                columns={columns}
                data={tableData}
            />
        </div>
    )
}