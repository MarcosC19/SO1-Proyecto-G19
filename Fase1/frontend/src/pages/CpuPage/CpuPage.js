import React from "react";
import "./CpuPage.css";
import NavBar from "../../components/NavBar/NavBar";
import Tree from '@naisutech/react-tree'

export default function CpuPage() {

  const data = [
    {
      "id": 12345678,
      "parentId": null,
      "label": "Proceso1, PID: ... , PID Padre: ..., Estado: ....",
      "items": []
    },
    {
      "id": 56789012,
      "parentId": 12345678,
      "label": "My child node"
    },
    {
      "id": 87654321,
      "label": "My file",
      "parentId": 12345678
    }
  ]

  return (
    <div id="body">
      <NavBar />
      <div id="vm1" className="bg-primary bg-gradient border border-dark">
        <p className="fs-1 text-center text-white">VM1</p>

        <p className="fs-2 text-start text-white">Procesos</p>
        <Tree nodes={data} theme="light" />

      </div>

      <div id="vm2" className="bg-success bg-gradient border border-dark">
        <p className="fs-1 text-center">VM2</p>
        <p className="fs-2 text-start text-white">Procesos</p>
        <Tree nodes={data} theme="light" />
      </div>
    </div>
  )
}