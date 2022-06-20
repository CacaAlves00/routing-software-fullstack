const { Client } = require("pg")
const DeliveryController = require("./api/Delivery/DeliveryController")
const PlaceController = require("./api/Place/PlaceController")
const TruckController = require("./api/Truck/TruckController")

class Application {

    constructor(router) {
        this.router = router

        this.setDatabaseConnection()
        this.setUpControllers()
    }

    setDatabaseConnection() {

        this.dbClient = new Client({
            user: process.env['DB_USER'],
            host: process.env['HOST'],
            database: process.env['DATABASE'],
            password: process.env['PASSWORD'],
            port: process.env['PORT'],
        })


        this.dbClient.connect(function (err) {
            if (err) throw err;
            console.log("Database connected with application backend!");
        });
    }

    setUpControllers() {
        this.truckController = new TruckController(this.router, this.dbClient)
        this.deliveryController = new DeliveryController(this.router, this.dbClient)
        this.placeController = new PlaceController(this.router, this.dbClient)
    }

}

module.exports = Application