import React, { useState, useEffect } from "react";
import './RamPage.css';
import NavBar from "../../components/NavBar/NavBar";
import RamInfo from '../../components/RamInfo/RamInfo';
import GraphRam from "../../components/GraphRam/GraphRam";

export default function RamPage() {

    const [dataRAM1, setDataRAM1] = useState({
        total: '',
        used: '',
        percentage: '',
        free: ''
    })

    const [dataRAM2, setDataRAM2] = useState({
        total: '',
        used: '',
        percentage: '',
        free: ''
    })

    const [arrayDataRam, setArrayDataRam] = useState({
        maxValue: 100,
        grafica1: [],
        grafica2: []
    })

    function getDataRam() {
        setInterval(() => {
            fetch(`http://${process.env.REACT_APP_IPAPI}/getRAMstatus`)
                .then(res => res.json())
                .then(data => {
                    setDataRAM1({
                        total: data.total,
                        used: data.used,
                        percentage: data.percentage,
                        free: data.free
                    })
                    arrayDataRam.grafica1.push(data.used)

                    setArrayDataRam({
                        maxValue: data.total,
                        grafica1: arrayDataRam.grafica1,
                        grafica2: arrayDataRam.grafica2
                    })
                })
        }, 1000)
    }

    useEffect(() => {
        getDataRam()
    }, [])

    return (
        <div id="body">
            <NavBar />
            <div id="vm1" className="bg-primary bg-gradient border border-dark">
                <p className="fs-1 text-center text-white">VM1</p>
                <RamInfo data={dataRAM1} />
            </div>

            <GraphRam data = {arrayDataRam}/>

            <div id="vm2" className="bg-success bg-gradient border border-dark">
                <p className="fs-1 text-center">VM2</p>
                <RamInfo data={dataRAM2} />
            </div>
        </div>
    )
}