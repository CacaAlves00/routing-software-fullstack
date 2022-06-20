// deal with inserting data that already exists (like emails)
// throw exceptions in case of errors
// will talk with the data access layer

const Delivery = require("./Delivery")
const DeliveryRepository = require("./DeliveryRepository")

class DeliveryService {
    constructor(dbClient) {
        this.repository = new DeliveryRepository(dbClient)
    }

    async addOne(json) {
        const delivery = new Delivery(json)

        if (!this.checkPositiveIntegerIntegrity(delivery.originId))
            throw new Error('Illegal State: originId')

        if (!this.checkPositiveIntegerIntegrity(delivery.destinyId))
            throw new Error('Illegal State: destinyId')

        const weightInTonneIsNegative = delivery.weightInTonne < 0
        const weightInTonneIsNaN = isNaN(delivery.weightInTonne)
        if (weightInTonneIsNegative || weightInTonneIsNaN)
            throw new Error('Illegal State: weightInTonne')

        if (!this.checkDateIntegrity(delivery.insertionDate))
            throw new Error('Illegal State: insertionDate')

        this.repository.addOne(delivery)
    }

    async deleteOne(json) {
        const delivery = new Delivery(json)

        if (! await this.doesDeliveryExist(delivery))
            throw new Error(`Object not found: ${delivery.deliveryId}`)

        this.repository.deleteById(delivery)
    }

    async findAll() {
        const queryResult = await this.repository.findAll()
        const deliveries = queryResult['rows']
        return deliveries
    }

    async doesDeliveryExist(delivery) {
        const querySearchById = await this.repository.findById(delivery)
        const doesDeliveryExist = querySearchById.rowCount == 1

        return doesDeliveryExist
    }

    checkPositiveIntegerIntegrity(integer) {
        const integerIsInteger = Number.isInteger(integer)
        const integerIsNegative = integer < 0
        const integerIsNaN = isNaN(integer)

        return (integerIsInteger && !integerIsNegative || !integerIsNaN)
    }

    checkDateIntegrity(dateStr) {
        return !isNaN(Date.parse(dateStr))
    }
}

module.exports = DeliveryService