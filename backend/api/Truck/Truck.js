class Truck {
    constructor(json) {
        this.licensePlate = json['licensePlate']
        this.capacityInTonne = +json['capacityInTonne']
        this.truckType = json['truckType']
        this.fuelConsumptionLByKM = +json['fuelConsumptionLByKM']
    }
}

module.exports = Truck