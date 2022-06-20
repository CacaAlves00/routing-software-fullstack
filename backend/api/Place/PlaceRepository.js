class PlaceRepository {
    constructor(dbClient) {
        this.dbClient = dbClient
    }

    addOne(place) {
        const query =
            `INSERT INTO place
            (city, state)
            VALUES ($1, $2)` 
            // ${place.latitude}, ${place.longitude}) 

        const values = [place.city, place.state]
        this.dbClient.query(query, values, (err, res) => {
            console.log(err, res)
        })
    }

    findById(place) {
        const query =
        `SELECT * FROM place WHERE place_id = $1`
        
        const values = [place.placeId]

        return this.dbClient.query(query, values)
    }

    findAll() {
        const query =
            'SELECT * FROM place'

        return this.dbClient.query(query)
    }

    findByCityAndState(place) {
        const query =
        `SELECT * FROM place WHERE city = $1 AND state = $2`
        
        const values = [place.city, place.state]

        return this.dbClient.query(query, values)
    }

}

module.exports = PlaceRepository