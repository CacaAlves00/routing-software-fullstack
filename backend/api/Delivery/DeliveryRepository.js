class DeliveryRepository {
    constructor(dbClient) {
        this.dbClient = dbClient
    }

    addOne(delivery) {
        const query =
            `INSERT INTO delivery
            (origin_id, destiny_id, load_type, weight_in_tonne, insertion_date)
            VALUES ($1, $2, $3, $4, $5)`

        const values = [delivery.originId, delivery.destinyId, delivery.loadType,
        delivery.weightInTonne, delivery.insertionDate]

        this.dbClient.query(query, values, (err, res) => {
            console.log(err, res)
        })
    }

    deleteById(delivery) {
        const query =
            `DELETE FROM delivery WHERE delivery_id = $1`

        const values = [delivery.deliveryId]

        this.dbClient.query(query, values, (err, res) => {
            console.log(err, res)
        })
    }

    findById(delivery) {
        const query =
            `SELECT * FROM delivery WHERE delivery_id = $1`

        const values = [delivery.deliveryId]

        return this.dbClient.query(query, values)
    }

    findAll() {
        const query =
            'SELECT * FROM delivery'

        return this.dbClient.query(query)
    }

}

module.exports = DeliveryRepository