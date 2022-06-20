// deal with inserting data that already exists (like emails)
// throw exceptions in case of errors
// will talk with the data access layer

const Place = require("./Place")
const PlaceRepository = require("./PlaceRepository")
const ApiFacade = require('../../services/api-facade/ApiFacade')

class PlaceService {
    constructor(dbClient) {
        this.repository = new PlaceRepository(dbClient)
    }

    async addOne(json) {
        const place = new Place(json)
        console.log(json)

        if (await this.doesPlaceExist(place))
            return
            // throw new Error(`Object already exists: ${place.city}, ${place.state}`)

        // await ApiFacade.setCoordinatesFromPlace(place)

        this.repository.addOne(place)
    }

    async find(json) {
        let place = new Place(json)

        const queryResult = await this.repository.findById(place)

        if (queryResult.rowCount == 0)
            throw new Error(`Object not found: ${place.placeId}`)

        place = queryResult['rows'][0]

        return place

    }

    async findAll() {
        const queryResult = await this.repository.findAll()
        const places = queryResult['rows']
        return places
    }

    async doesPlaceExist(place) {
        const querySearchByCityAndState = await this.repository.findByCityAndState(place)
        const doesPlaceExist = querySearchByCityAndState.rowCount == 1

        return doesPlaceExist
    }

    async route(placesId) {
        const places = placesId.map(async pi => {
            const place = await this.find({placeId: pi})
            return place
        })

        return ApiFacade.TSPSolve(places)
    }

}

module.exports = PlaceService