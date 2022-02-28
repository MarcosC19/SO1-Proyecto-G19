import React from "react";
import './Home.css'
import RamInfo from "../../components/ramInfo/ramInfo";
import GraphRam from "../../components/graphRam/graphRam";

export default function Home() {

    return (
        <div id="body">
            <div id="vm1" className="bg-primary bg-gradient border border-dark">
                <p className="fs-1 text-center text-white">VM1</p>
                <RamInfo />
            </div>

            <GraphRam/>

            <div id="vm2" className="bg-success bg-gradient border border-dark">
                <p className="fs-1 text-center">VM2</p>
                <RamInfo />
            </div>
        </div>
    )
}