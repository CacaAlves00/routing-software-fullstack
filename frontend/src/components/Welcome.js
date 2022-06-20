import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import './Welcome.css'

function Welcome() {
    const linkStyle = {
        textDecoration: 'none',
        color: 'black'
    }

    return (
        <Card
            // bg='#00000'
            text='dark'
            className='mb-2 welcome-card'
        >
            <Card.Header className='card-header'>Software de roteamento</Card.Header>
            <Card.Body className='card-body'>
                <Card.Title className='card-title'> Bem vindo ! </Card.Title>
                <Card.Text className='card-text'>
                    UTFPR -  Campus Ponta Grossa
                </Card.Text>
                <Card.Text className='card-text'>
                    Empresa Bsoft
                </Card.Text>

                <Link className='link' to='/list-deliveries' style={linkStyle}>
                    <BsArrowRight className='icon' size='2.7rem' />
                </Link>
            </Card.Body>
        </Card>
    )
}

export default Welcome