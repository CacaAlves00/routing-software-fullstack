class TruckRepository {
    constructor(dbClient) {
        this.dbClient = dbClient
    }

    addOne(truck) {
        const query =
            `INSERT INTO truck
            (license_plate, capacity_in_tonne, truck_type, fuel_consumption_L_by_KM)
            VALUES ('${truck.licensePlate}', ${truck.capacityInTonne}, 
            '${truck.truckType}', ${truck.fuelConsumptionLByKM})` 

        this.dbClient.query(query, (err, res) => {
            console.log(err, res)
        })
    }

    deleteByLicensePlate(truck) {
        const query =
            `DELETE FROM truck WHERE license_plate = '${truck.licensePlate}'`

        // const values = [truck.licensePlate]

        this.dbClient.query(query, (err, res) => {
            console.log(err, res)
        })
    }

    findByLicensePlate(truck) {
        const query =
        `SELECT * FROM truck WHERE license_plate = $1`
        
        const values = [truck.licensePlate]

        return this.dbClient.query(query, values)
    }

    findAll() {
        const query =
            `SELECT * FROM truck`

        return this.dbClient.query(query)
    }
}

module.exports = TruckRepository