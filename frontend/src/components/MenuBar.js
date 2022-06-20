import React from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from './../imgs/home.svg'
import { BsHouseDoorFill } from 'react-icons/bs'

import './MenuBar.css'

function MenuBar() {

    const linkStyle = {
        textDecoration: 'none',
        color: 'black'
    }

    return (
        <nav>
            <Link to='/list-deliveries' style={linkStyle}>Entregas</Link>
            <Link to='/list-trucks' style={linkStyle}>Caminhões</Link>
            <Link to='/import-file' style={linkStyle}>Importar</Link>
            <Link to='/about' style={linkStyle}>Sobre</Link>
        </nav>
    )
}

export default MenuBar