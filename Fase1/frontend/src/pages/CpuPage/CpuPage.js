import React, { useEffect, useState } from "react";
import "./CpuPage.css";
import NavBar from "../../components/NavBar";
import Tree from '@naisutech/react-tree';
import Swal from 'sweetalert2';

export default function CpuPage() {

  const [proc1, setProc1] = useState({
    allData: []
  })

  const [proc2, setProc2] = useState({
    allData: []
  })

  function getData() {
    fetch(`http://${process.env.REACT_APP_IPAPI}:80/getCPUstatus`)
      .then(res => res.json())
      .then(data => {
        let values = data.data
        if (data.vm === 1) {
          values.forEach(value => {
            let myNode = []
            let id = value.pid
            let parentId = value.ppid
            let nameP = value.name
            let state = value.state
            let childs = value.childs
            let newParentId = null

            if (parentId !== 0) {
              newParentId = parentId
            }

            switch (state) {
              case 0:
                state = 'Running'
                break
              case 1:
                state = 'Interrumpible Sleeping'
                break
              case 2:
                state = 'Uninterrumpible Sleeping'
                break
              case 1026:
                state = 'Idle'
                break
              default:
                state = '0'
                break
            }

            let newFormat = {
              "id": id,
              "parentId": newParentId,
              "label": `Proceso: ${nameP}`,
              "items": [{
                "label": `PID: ${id}`,
                "parentId": id
              }, {
                "label": `PID Padre: ${parentId}`,
                "parentId": id
              }, {
                "label": `Estado: ${state}`,
                "parentId": id
              }]
            }
            myNode.push(newFormat)

            childs.forEach(child => {
              let nameChild = child.name
              let ppidChild = child.ppid
              let pidChild = child.pid
              let stateChild = child.state

              switch (stateChild) {
                case 0:
                  stateChild = 'Running'
                  break
                case 1:
                  stateChild = 'Interrumpible Sleeping'
                  break
                case 2:
                  stateChild = 'Uninterrumpible Sleeping'
                  break
                case 1026:
                  stateChild = 'Idle'
                  break
                default:
                  stateChild = '0'
                  break
              }

              let newFormatChild = {
                "id": pidChild,
                "parentId": ppidChild,
                "label": `Proceso: ${nameChild}`,
                "items": [{
                  "label": `PID: ${pidChild}`,
                  "parentId": pidChild
                }, {
                  "label": `PID Padre: ${ppidChild}`,
                  "parentId": pidChild
                }, {
                  "label": `Estado: ${stateChild}`,
                  "parentId": pidChild
                }]
              }
              myNode.push(newFormatChild)
            })

            proc1.allData.push(myNode)

            setProc1({
              allData: proc1.allData
            })
          });
        } else if (data.vm === 2){
          values.forEach(value => {
            let myNode = []
            let id = value.pid
            let parentId = value.ppid
            let nameP = value.name
            let state = value.state
            let childs = value.childs
            let newParentId = null

            if (parentId !== 0) {
              newParentId = parentId
            }

            switch (state) {
              case 0:
                state = 'Running'
                break
              case 1:
                state = 'Interrumpible Sleeping'
                break
              case 2:
                state = 'Uninterrumpible Sleeping'
                break
              case 1026:
                state = 'Idle'
                break
              default:
                state = '0'
                break
            }

            let newFormat = {
              "id": id,
              "parentId": newParentId,
              "label": `Proceso: ${nameP}`,
              "items": [{
                "label": `PID: ${id}`,
                "parentId": id
              }, {
                "label": `PID Padre: ${parentId}`,
                "parentId": id
              }, {
                "label": `Estado: ${state}`,
                "parentId": id
              }]
            }
            myNode.push(newFormat)

            childs.forEach(child => {
              let nameChild = child.name
              let ppidChild = child.ppid
              let pidChild = child.pid
              let stateChild = child.state

              switch (stateChild) {
                case 0:
                  stateChild = 'Running'
                  break
                case 1:
                  stateChild = 'Interrumpible Sleeping'
                  break
                case 2:
                  stateChild = 'Uninterrumpible Sleeping'
                  break
                case 1026:
                  stateChild = 'Idle'
                  break
                default:
                  stateChild = '0'
                  break
              }

              let newFormatChild = {
                "id": pidChild,
                "parentId": ppidChild,
                "label": `Proceso: ${nameChild}`,
                "items": [{
                  "label": `PID: ${pidChild}`,
                  "parentId": pidChild
                }, {
                  "label": `PID Padre: ${ppidChild}`,
                  "parentId": pidChild
                }, {
                  "label": `Estado: ${stateChild}`,
                  "parentId": pidChild
                }]
              }
              myNode.push(newFormatChild)
            })

            proc2.allData.push(myNode)

            setProc2({
              allData: proc2.allData
            })
          });
        }

        
        Swal.fire({
          title: `Procesos cargados de VM${data.vm}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        })
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div id="body">
      <NavBar />
      <div id="vm1" className="bg-primary bg-gradient border border-dark">
        <p className="fs-1 text-center text-white">VM1</p>

        <p className="fs-2 text-start text-white">Procesos</p>
        {
          proc1.allData.map(nodo => {
            return (
              <Tree nodes={nodo} theme="light" />
            )
          })
        }

      </div>

      <div id="vm2" className="bg-success bg-gradient border border-dark">
        <p className="fs-1 text-center">VM2</p>
        <p className="fs-2 text-start text-white">Procesos</p>
        
        {
          proc2.allData.map(nodo => {
            return (
              <Tree nodes={nodo} theme="light" />
            )
          })
        }
      </div>
    </div>
  )
}