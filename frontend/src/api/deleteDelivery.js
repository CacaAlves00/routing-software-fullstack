import { default as axios } from 'axios'

async function deleteDelivery(deliveryId) {

  try {
    const baseUrl = process.env.REACT_APP_BACKEND_URL

    const deleteDeliveriesUrl = baseUrl + 'deliveries/'
    await axios.delete(deleteDeliveriesUrl, {
        data: {
            deliveryId: deliveryId
        },
        headers: { 
            "Authorization": "***" 
        }
    })

  } catch (err) {
    throw new Error('Server error: ' + err.message);
  }
}

export default deleteDelivery