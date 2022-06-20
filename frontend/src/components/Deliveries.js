import React, { useEffect, useState } from 'react'
import { Button, Dropdown, DropdownButton, Spinner, Table } from 'react-bootstrap'
import './Deliveries.css'
import fetchDeliveries from '../api/fetchDeliveries'
import deleteDeliveryFromDatabase from '../api/deleteDelivery'

function Deliveries() {

  const [deliveries, setDeliveries] = useState(null)
  const [selectedDeliveries, setSelectedDeliveries] = useState([])

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDeliveries()
      setDeliveries(data)
    }

    fetchData()
  }, [])


  function toggleSelected(deliveryId) {

    if (isElementSelected(deliveryId))
      setSelectedDeliveries(
        selectedDeliveries => selectedDeliveries.filter(item => item != deliveryId))
    else
      setSelectedDeliveries(selectedDeliveries => [...selectedDeliveries, deliveryId])


  }

  function isElementSelected(deliveryId) {
    return selectedDeliveries.includes(deliveryId)
  }

  async function route() {
    let deliveriesSelectedToRoute = deliveries.filter(delivery => {
      return selectedDeliveries.includes(delivery.delivery_id)
    })

    const placesToRoute = []

    for (let delivery of deliveriesSelectedToRoute) {
      const origin = `${delivery.origin.city} - ${delivery.origin.state}`
      if (!placesToRoute.includes(origin))
        placesToRoute.push(origin)

      const destiny = `${delivery.destiny.city} - ${delivery.destiny.state}`
      if (!placesToRoute.includes(destiny))
        placesToRoute.push(destiny)
    }

    let routingRrl = 'https://www.google.com/maps/dir/'
    placesToRoute.forEach(place => {
      routingRrl += place + '/'
    })

    routingRrl += placesToRoute[0]

    console.log(routingRrl)

    window.open(routingRrl)

  }

  async function deleteDelivery(deliveryId) {
    await deleteDeliveryFromDatabase(deliveryId)
    window.location.href = process.env.REACT_APP_FRONTEND_URL + 'list-deliveries'
  }

  return (
    <article id='delivery-table'>

      {
        deliveries == null ? <Spinner className='spinner' animation='border' variant='primary' /> :

          <Table className='table' hover variant='secondary'>
            <thead>
              <tr>
                <th>Origem</th>
                <th>Destino</th>
                <th>Tipo de carga</th>
                <th>Peso/Ton</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {
                deliveries.map(delivery => (
                  <tr key={delivery.delivery_id}>
                    <td style={{
                      backgroundColor: isElementSelected(delivery.delivery_id)
                        ? '#b8b8b8' : '#f1faee'
                    }}>
                      {delivery.origin.city} - {delivery.origin.state}
                    </td>
                    <td style={{
                      backgroundColor: isElementSelected(delivery.delivery_id)
                        ? '#b8b8b8' : '#f1faee'
                    }}>
                      {delivery.destiny.city} - {delivery.destiny.state}</td>
                    <td style={{
                      backgroundColor: isElementSelected(delivery.delivery_id)
                        ? '#b8b8b8' : '#f1faee'
                    }}>
                      {delivery.load_type}
                    </td>
                    <td style={{
                      backgroundColor: isElementSelected(delivery.delivery_id)
                        ? '#b8b8b8' : '#f1faee'
                    }}>
                      {delivery.weight_in_tonne}</td>

                    <td style={{
                      backgroundColor: isElementSelected(delivery.delivery_id)
                        ? '#b8b8b8' : '#f1faee'
                    }}>
                      <DropdownButton
                        variant='primary'
                        title='Ação'
                      >
                        <Dropdown.Item eventKey='1'
                          onClick={() => toggleSelected(delivery.delivery_id)}>
                          Selecionar/Desselecionar
                        </Dropdown.Item>
                        <Dropdown.Item eventKey='2'
                          onClick={() => deleteDelivery(delivery.delivery_id)}
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

      <Button className='button' variant="primary" onClick={route}>Roteirizar</Button>

    </article>
  )
}

export default Deliveries