import { default as axios } from 'axios'

async function fetchDeliveries() {

  try {
    const baseUrl = process.env.REACT_APP_BACKEND_URL

    const fetchDeliveriesUrl = baseUrl + 'deliveries/find-all'
    const deliveriesFetchResponse = await axios.get(fetchDeliveriesUrl, {})

    for (let delivery of deliveriesFetchResponse.data.deliveries) {
      delivery.origin = await fetchPlace(delivery['origin_id'])
      delivery.destiny = await fetchPlace(delivery['destiny_id'])
    }

    return deliveriesFetchResponse.data.deliveries

  } catch (err) {
    throw new Error('Server error: ' + err.message);
  }
}

async function fetchPlace(placeId) {
  try {
    const baseUrl = process.env.REACT_APP_BACKEND_URL
    const fetchPlaceUrl = baseUrl + `places/${placeId}`

    const fetchPlaceUrlResponse = await axios.get(fetchPlaceUrl, {})

    const place = fetchPlaceUrlResponse.data.place

    return place

  } catch (err) {
    throw new Error('Server error: ' + err.message);
  }
}

export default fetchDeliveries