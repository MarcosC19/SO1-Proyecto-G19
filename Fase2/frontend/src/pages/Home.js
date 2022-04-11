import React, { useState, useEffect } from 'react'
import '../css/Home.css'
import { Table } from 'reactstrap'

import NavBar from '../components/NavBar'

export default function Home(){
    const [image, setImage] = useState('')
    
    function getImage(){
        fetch(`https://picsum.photos/780/734`)
        .then(res => {
            setImage(res.url)
        })
    }

    useEffect(() => {
        getImage()
    }, [])

    return(
        <div>
            <NavBar/>
            <div className='font'>
                <img src={image}/>
            </div>
            <div className='dataStudents'>
                <h3>Grupo 19</h3>
            <Table responsive striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Carné</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope='row'>1</th>
                        <td>Steven S. Jocol Gomez</td>
                        <td>201602938</td>
                    </tr>
                    <tr>
                        <th scope='row'>2</th>
                        <td>Marcos Enrique Curtidor Sagui</td>
                        <td>201900874</td>
                    </tr>
                </tbody>
            </Table>
            </div>
        </div>
    )
}