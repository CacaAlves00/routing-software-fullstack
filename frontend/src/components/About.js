import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import './About.css'

function About() {
    return (
        <Card
            // bg='#00000'
            text='dark'
            className='mb-2 about-card'
        >
            <Card.Header className='card-header'>Software de roteamento</Card.Header>
            <Card.Body className='card-body'>
                <Card.Title className='card-title'> Sobre </Card.Title>
                <Card.Text className='card-text'>
                    Aluno: Antônio Carlos Alves Feitosa
                </Card.Text>
                <Card.Text className='card-text'>
                    Github: https://github.com/CacaAlves00
                </Card.Text>

                <Card.Text className='card-text'>
                    LinkedIn: https://www.linkedin.com/in/ant%C3%B4nio-carlos-alves-964a31239/
                </Card.Text>

                <Card.Text className='card-text'>
                    Telefone: +55 (42) 99909-4956
                </Card.Text>

            </Card.Body>
        </Card>
    )
}

export default About