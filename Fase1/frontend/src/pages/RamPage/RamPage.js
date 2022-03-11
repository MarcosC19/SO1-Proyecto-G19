import React, { useState, useEffect } from "react";
import './RamPage.css';
import NavBar from "../../components/NavBar";
import RamInfo from '../../components/RamInfo';
import GraphRam from '../../components/GraphRam'

export default function RamPage() {

    const [dataRAM1, setDataRAM1] = useState({
        total: 0,
        used: 0,
        percentage: 0,
        free: 0
    })

    const [dataRAM2, setDataRAM2] = useState({
        total: 0,
        used: 0,
        percentage: 0,
        free: 0
    })

    const [arrayDataRam, setArrayDataRam] = useState({
        maxValue: 100,
        grafica1: [],
        grafica2: []
    })

    function getDataRam() {
        const timeOut = setInterval(() => {
            fetch(`http://${process.env.REACT_APP_IPAPI}:80/getRAMstatus`)
                .then(res => res.json())
                .then(data => {
                    console.log(data.data)
                    let values = data.data
                    if (data.vm === 1) {
                        setDataRAM1({
                            total: values.total,
                            used: values.used,
                            percentage: values.percentage,
                            free: values.free
                        })
                        arrayDataRam.grafica1.push(values.used)

                        setArrayDataRam({
                            maxValue: values.total,
                            grafica1: arrayDataRam.grafica1,
                            grafica2: arrayDataRam.grafica2
                        })
                    } else if (data.vm === 2) {
                        setDataRAM2({
                            total: values.total,
                            used: values.used,
                            percentage: values.percentage,
                            free: values.free
                        })
                        arrayDataRam.grafica2.push(values.used)

                        setArrayDataRam({
                            maxValue: values.total,
                            grafica1: arrayDataRam.grafica1,
                            grafica2: arrayDataRam.grafica2
                        })
                    }
                })
        }, 2000)
        return timeOut
    }

    useEffect(() => {
        const timeOut = getDataRam()
        return () => clearInterval(timeOut)
    }, [])

    return (
        <div id="body">
            <NavBar />
            <div id="vm1" className="bg-primary bg-gradient border border-dark">
                <p className="fs-1 text-center text-white">VM1</p>
                <RamInfo data={dataRAM1} />
            </div>

            <GraphRam data={arrayDataRam} />

            <div id="vm2" className="bg-success bg-gradient border border-dark">
                <p className="fs-1 text-center">VM2</p>
                <RamInfo data={dataRAM2} />
            </div>
        </div>
    )
}