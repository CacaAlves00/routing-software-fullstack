import React, { useEffect, useState } from 'react'
import { Button, Dropdown, DropdownButton, Spinner, Table } from 'react-bootstrap'
import './Trucks.css'
import fetchTrucks from '../api/fetchTrucks'
import deleteTruckFromDatabase from '../api/deleteTruck'

function Trucks() {

  const [trucks, setTrucks] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const data = await fetchTrucks()
      setTrucks(data)
    }

    fetchData()
  }, [])


  async function deleteTruck(licensePlate) {
    await deleteTruckFromDatabase(licensePlate)
    window.location.href = process.env.REACT_APP_FRONTEND_URL + 'list-trucks'
  }

  return (
    <article id='truck-table'>

      {
        trucks == null ? <Spinner className='spinner' animation='border' variant='primary' /> :

          <Table className='table' hover variant='secondary'>
            <thead>
              <tr>
                <th>Placa</th>
                <th>Capacidade/Ton</th>
                <th>Tipo de veículo</th>
                <th>Consumo L/KM</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {
                trucks.map(truck => (
                  <tr key={truck.license_plate}>
                    <td>
                      {truck.license_plate}
                    </td>
                    <td>
                      {truck.capacity_in_tonne}</td>
                    <td>
                      {truck.truck_type}
                    </td>
                    <td>
                      {truck.fuel_consumption_l_by_km}</td>

                    <td>
                      <DropdownButton
                        variant='primary'
                        title='Ação'
                      >
                        <Dropdown.Item eventKey='1'
                          onClick={() => deleteTruck(truck.license_plate)}
                        >
                          Excluir
                        </Dropdown.Item>

                      </DropdownButton>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
      }

    </article>
  )
}

export default Trucks