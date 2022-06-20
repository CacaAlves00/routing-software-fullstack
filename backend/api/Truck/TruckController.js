const TruckService = require("./TruckService")

class TruckController {
    constructor(router, dbClient) {
        this.router = router

        this.setUpRoutes()
        this.setUpService(dbClient)
    }

    setUpRoutes() {
        this.router.route('/trucks/') 
        .post(async (req, res) => {
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
        .delete(async (req, res) => {
            try {
                await this.service.deleteOne(req.body)
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

        this.router.get('/trucks/find-all', async (req, res) => {
            const trucks = await this.service.findAll()
            res.json({
                'code': 200,
                'trucks': trucks
            })
        })

    }

    setUpService(dbClient) {
        this.service = new TruckService(dbClient)
    }

}

module.exports = TruckController