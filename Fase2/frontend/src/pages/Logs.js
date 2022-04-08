import React,{useRef, useState, useEffect} from 'react';
import '../css/Logs.css';
import DataTable from 'react-data-table-component';
import NavBar from '../components/NavBar';
import CanvasJSReact from './../components/Canvas/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const RUST_API_HOST = "https://rust-api-4waihun6ya-uc.a.run.app";

const columns = [
    {
        name: 'Nombre del Juego',
        selector: row => row.game_name===""?("Piedra, Papel o Tijeras"):row.game_name,
    },
    {
        name: 'Ganador',
        selector: row => row.winner,
    },
    {
        name: "Jugadores",
        selector: row => row.players,
        
    },
    {
        name: 'Ruta',
        selector: row => row.queue,
    },
];

const paginationOptions = {
	rowsPerPageText: 'Filas por página',
	rangeSeparatorText: 'de',
	selectAllRowsItem: true,
	selectAllRowsItemText: 'Todos',
};


export default function Logs(){

    const [tableData, setTableData] = useState([]);
    const [char1Data, setChar1Data] = useState([]);
    const [char2Data, setChar2Data] = useState([]);

    const options_top = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Top 3 Games"
        },
        axisY: {
            title: "Partidas Jugadas",
        },
        axisX: {
            title: "Juego"
        },
        data: [{
            type: "bar",
            dataPoints: char1Data
        }]
    };

    const options_queue = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Inserciones por Queue"
        },
        axisY: {
            title: "Inserciones",
        },
        axisX: {
            title: "Plataforma"
        },
        data: [{
            type: "bar",
            dataPoints: char2Data
        }]
    };

    useEffect(() => {
        fillData();
        let updateTask = setInterval(fillData, 5000);
        
        return () => {
            clearInterval(updateTask);
        }
    },[]);

    const getGameName = (gameID) => {
        switch(gameID){
            case "1":
                return "Piedra, Papel o Tijeras";
            case "2":
                return "Numero Mayor";
            case "3":
                return "Numero Menor";
            case "4":
                return "Cara o Cruz";
            case "5":
                return "Ruleta";
            default:
                return "Desconocido";
        }
    }

    const fillData = () => {
        console.log("Fetching Logs Data");
        getLogs().then((result) => {

            // Set General Log Data Table Info
            setTableData(result);


            // Set Chart of Top 3
            let topList = {};
            result.forEach((game) => {
                if(topList[game.game_id] !== undefined){
                    topList[game.game_id] = topList[game.game_id] + 1;
                }else{
                    topList[game.game_id] = 1;
                }
            });

            let dotList_top = [];
            for(var key in topList){
                let np = {
                    y: parseInt(topList[key]), label: getGameName(key)
                };
                dotList_top.push(np);
            };

            dotList_top.sort();
            dotList_top = dotList_top.slice(0,3);
            setChar1Data(dotList_top);

            // Set Chart of Number of Inserts per Queue

            let insertList = {};
            
            result.forEach((game) => {
                if(insertList[game.queue] !== undefined){
                    insertList[game.queue] = insertList[game.queue] + 1;
                }else{
                    insertList[game.queue] = 1;
                }
            });

            let dotList_queue = [];
            for(var key in insertList){
                let np = {
                    y: parseInt(insertList[key]), label: key
                };
                dotList_queue.push(np);
            };

            setChar2Data(dotList_queue);
        });
    }

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
            <h1>Historial y Reporte de Juegos</h1>

            <DataTable
                columns={columns}
                data={tableData}
                pagination
                paginationComponentOptions={paginationOptions}
            />
            <br/>
            <hr/>
            <CanvasJSChart options={options_top} />
            <br/>
            <hr/>
            <CanvasJSChart options={options_queue} />
        </div>
    )
}