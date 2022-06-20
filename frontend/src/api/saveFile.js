import { default as axios } from 'axios'

async function saveFile(data, type) {
    const rows = data.split('\n')

    if (type == 'Entrega') {
        for (let i = 1; i < rows.length; i++) {
            if (rows[i].length == 0)
                continue

            const row = rows[i].split(',')

            // row[5] = row[5].substring(0, row[5].length - 1)

            const originPlaceData = {
                city: row[0],
                state: row[1]
            }

            const originPlace = await findPlaceAndSalveIfNotExists(originPlaceData)

            const destinyPlaceData = {
                city: row[2],
                state: row[3]
            }

            const destinyPlace = await findPlaceAndSalveIfNotExists(destinyPlaceData)


            const error = await saveDelivery({
                originId: originPlace.placeId,
                destinyId: destinyPlace.placeId,
                loadType: row[4],
                weightInTonne: row[5],
                insertionDate: new Date().toISOString().slice(0, 10)
            })

            if (error.length > 0) return error
        }
    }
    else {
        for (let i = 1; i < rows.length; i++) {
            if (rows[i].length == 0)
                continue

            const row = rows[i].split(',')
            console.log(row)
            const error = await saveTruck({
                licensePlate: row[0],
                capacityInTonne: row[1],
                truckType: row[2],
                fuelConsumptionLByKM: row[3]
            })

            if (error.length > 0) return error
        }
    }

    return null // No errors
}

async function saveDelivery(delivery) {
    try {
        const baseUrl = process.env.REACT_APP_BACKEND_URL

        const saveDeliveriesUrl = baseUrl + 'deliveries'

        const res = await axios.post(saveDeliveriesUrl, {
            data: delivery,
            headers: {
                "Authorization": "***"
            }
        })

        return res.data.code == 200 ? '' : res.data.error.message
    }
    catch (err) {
        console.log(err)
    }
}

async function saveTruck(truck) {
    try {

        const baseUrl = process.env.REACT_APP_BACKEND_URL

        const saveTruckUrl = baseUrl + 'trucks'

        const res = await axios.post(saveTruckUrl, {
            data: truck,
            headers: {
                "Authorization": "***"
            }
        })

        return res.data.code == 200 ? '' : res.data.error.message
    }
    catch (err) {
        console.log(err)
        return err.msg
    }
}

async function findPlaceAndSalveIfNotExists(place) {
    const placeFetched = await fetchPlace(place)
    const placeExists = placeFetched.length != 0
    if (!placeExists)
        await savePlace(place)

    const fetchedPlace = await fetchPlace(place)
    place.placeId = fetchedPlace[0].place_id

    return place
}

async function fetchPlace(placeToFetch) {
    try {

        const baseUrl = process.env.REACT_APP_BACKEND_URL
        const findAllPlacesUrl = baseUrl + 'places/find-all'

        const res = await axios.get(findAllPlacesUrl, {})
        const places = res.data.places

        const { city, state } = placeToFetch

        const place = places.filter(p => p.city == city
            && p.state == state)

        return place
    }
    catch (err) {
        console.log(err)
        return err.msg
    }
}

async function savePlace(place) {
    try {

        const baseUrl = process.env.REACT_APP_BACKEND_URL
        const savePlaceUrl = baseUrl + 'places/'

        const res = await axios.post(savePlaceUrl, {
            data: {
                city: place.city,
                state: place.state
            },
            headers: {
                "Authorization": "***"
            }
        })

        console.log(res)
    }
    catch (err) {
        console.log(err)
        return err.msg
    }
}


export default saveFile