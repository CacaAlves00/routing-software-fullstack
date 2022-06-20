class Delivery {
    constructor(json) {
        this.deliveryId = +json['deliveryId']
        this.originId = +json['originId']
        this.destinyId = +json['destinyId']
        this.loadType = json['loadType']
        this.weightInTonne = +json['weightInTonne']
        this.insertionDate = new Date(json['insertionDate'])
    }
}

module.exports = Delivery