import { default as axios } from 'axios'

async function deleteTruck(licensePlate) {

  try {
    const baseUrl = process.env.REACT_APP_BACKEND_URL

    const deleteTrucksUrl = baseUrl + 'trucks/'
    await axios.delete(deleteTrucksUrl, {
        data: {
          licensePlate: licensePlate
        },
        headers: { 
            "Authorization": "***" 
        }
    })

  } catch (err) {
    throw new Error('Server error: ' + err.message);
  }
}

export default deleteTruck