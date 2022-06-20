import { default as axios } from 'axios'

async function fetchTrucks() {

  try {
    const baseUrl = process.env.REACT_APP_BACKEND_URL

    const fetchTrucksUrl = baseUrl + 'trucks/find-all'
    const trucksFetchResponse = await axios.get(fetchTrucksUrl, {})

    return trucksFetchResponse.data.trucks

  } catch (err) {
    throw new Error('Server error: ' + err.message);
  }
}

export default fetchTrucks