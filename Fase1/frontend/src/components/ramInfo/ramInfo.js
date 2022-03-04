import React from "react";
import './RamInfo.css'

export default function RamInfo(props) {
    let data = props.data

    return (
        <div className="ram bg-black text-white">
            <p className="fs-2 text-start">RAM</p>
            <div id="contenedor1" className="bg-primary">
                <p className="fs-4 text-center">{data.total}<br />MB</p>
                <span className="memoryText">Total memoria RAM</span>
            </div>
            <div id="contenedor2" className="bg-warning">
                <p className="fs-4 text-center">{data.used}<br />MB</p>
                <span className="memoryText2">Memoria RAM en uso</span>
            </div>
            <div id="contenedor3" className="bg-danger">
                <p className="fs-4 text-center">{data.percentage}<br />%</p>
                <span className="memoryText3">Porcentaje de RAM en uso</span>
            </div>
            <div id="contenedor4" className="bg-success">
                <p className="fs-4 text-center">{data.free}<br />MB</p>
                <span className="memoryText4">Memoria RAM libre</span>
            </div>
        </div>
    )
}