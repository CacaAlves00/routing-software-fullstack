const PlaceService = require('./PlaceService')
const ApiFacade = require('./../../services/api-facade/ApiFacade')

class PlaceController {
    constructor(router, dbClient) {
        this.router = router

        this.setUpRoutes()
        this.setUpService(dbClient)
    }

    setUpRoutes() {
        this.router.post('/places', async (req, res) => {
            try {
                await this.service.addOne(req.body.data)
                res.json({
                    'code': 200
                })
            } catch (err) {
                res.json({
                    'code': 400,
                    'error': { 'message': err.message }
                })
            }

        })

        this.router.get('/places/find-all', async (req, res) => {
            try {
                const places = await this.service.findAll()
                res.json({
                    'code': 200,
                    'places': places
                })
            } catch (err) {
                res.json({
                    'code': 400,
                    'error': { 'message': err.message }
                })
            }
        })

        this.router.get('/places/:placeId', async (req, res) => {
            const place = await this.service.find(req.params)

            try {
                // await this.service.addOne(req.body)
                res.json({
                    'code': 200,
                    'place': place
                })
            } catch (err) {
                res.json({
                    'code': 400,
                    'error': { 'message': err.message }
                })
            }

        })

        // http://localhost:3002/places/route/2 3 4 5 6 7
        // req.params.placesId = '2 3 4 5 6 7'
        this.router.get('/places/route/:placesId', async (req, res) => {
            try {

                let placesId = req.params['placesId'].split(' ')
                placesId = placesId.map(place => +place)

                const route = await this.service.route(placesId)

                res.json({
                    'code': 200,
                    'route': route
                })

            } catch (err) {
                res.json({
                    'code': 400,
                    'error': { 'message': err.message }
                })
            }

        })

    }

    setUpService(dbClient) {
        this.service = new PlaceService(dbClient)
    }

}

module.exports = PlaceController