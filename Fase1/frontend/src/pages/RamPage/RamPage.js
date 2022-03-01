import React from "react";
import './RamPage.css';
import NavBar from "../../components/NavBar/NavBar";
import RamInfo from '../../components/RamInfo/RamInfo';
import GraphRam from "../../components/GraphRam/GraphRam";

export default function RamPage() {

    return (
        <div id="body">
            <NavBar/>
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