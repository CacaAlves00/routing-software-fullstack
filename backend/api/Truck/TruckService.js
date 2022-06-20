// deal with inserting data that already exists (like emails)
// throw exceptions in case of errors
// will talk with the data access layer

const Truck = require("./Truck")
const TruckRepository = require("./TruckRepository")

class TruckService {
    constructor(dbClient) {
        this.repository = new TruckRepository(dbClient)
    }

    async addOne(json) {
        const truck = new Truck(json)

        const capacityIsInteger = Number.isInteger(truck.capacityInTonne)
        const capacityIsNegative = truck.capacityInTonne < 0
        const capacityIsNaN = isNaN(truck.capacityInTonne)
        console.log(json)
        if (!capacityIsInteger || capacityIsNegative || capacityIsNaN)
            throw new Error('Illegal State: capacityInTonne')

        const fuelConsumptionIsNegative = truck.fuelConsumptionLByKM < 0
        const fuelComsumptionIsNaN = isNaN(truck.fuelConsumptionLByKM)
        if (fuelConsumptionIsNegative || fuelComsumptionIsNaN)
            throw new Error('Illegal State: fuelConsumptionLByKM')

        if (await this.doesTruckExist(truck))
            throw new Error(`Object already exists: ${truck.licensePlate}`)

        this.repository.addOne(truck)
    }

    async deleteOne(json) {
        const truck = new Truck(json)

        if (! await this.doesTruckExist(truck))
            throw new Error(`Object not found: ${truck.licensePlate}`)

        this.repository.deleteByLicensePlate(truck)
    }

    async findAll() {
        const queryResult = await this.repository.findAll()
        const trucks = queryResult['rows']
        return trucks
    }

    async doesTruckExist(truck) {
        const queryResult = await this.repository.findByLicensePlate(truck)
        const doesTruckExist = queryResult.rowCount == 1

        return doesTruckExist
    }
}

module.exports = TruckService