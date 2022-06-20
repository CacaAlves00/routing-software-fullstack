const TSPSolver = require('@nikbelikov/tsp-solver')
const Place = require('../../api/Place/Place')
const axios = require('axios').default;

class ApiFacade {

    static async setCoordinatesFromPlace(place) {

        const url = 'https://nominatim.openstreetmap.org/search'

        const params = {
            city: place.city,
            state: place.state,
            limit: 1,
            format: 'jsonv2'
        }

        try {
            const apiResponse = await axios.get(url, { params })

            place.latitude = +apiResponse.data[0].lat
            place.longitude = +apiResponse.data[0].lon

        } catch (err) {
            throw new Error('Server error: ' + err.message);
        }
    }

    static async TSPSolve(places) {

        for (let i = 0; i < places.length; i++) {
            places[i] = await places[i]
        }

        const points = places.map((place, key) => {
            return {
                id: key,
                name: place.city
            }
        })

        const distances = Place.getDistances(places)

        return TSPSolver.default(points, distances)
    }

}

module.exports = ApiFacade