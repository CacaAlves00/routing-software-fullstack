const DeliveryService = require("./DeliveryService")

class DeliveryController {
    constructor(router, dbClient) {
        this.router = router

        this.setUpRoutes()
        this.setUpService(dbClient)
    }

    setUpRoutes() {

        this.router.route('/deliveries')
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

        this.router.get('/deliveries/find-all', async (req, res) => {
            try {
                const deliveries = await this.service.findAll()
                res.json({
                    'code': 200,
                    'deliveries': deliveries
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
        this.service = new DeliveryService(dbClient)
    }
}

module.exports = DeliveryController