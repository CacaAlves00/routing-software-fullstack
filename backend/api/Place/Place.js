class Place {
    constructor(json) {
        this.placeId = +json['placeId']

        this.city = json['city']
        this.state = json['state']

        this.latitude = json['latitute']
        this.longitude = json['longitude']
    }

    static getDistances(places) {
        const distances = []
        
        for (let i = 0; i < places.length; i++) {
            for (let j = i + 1; j < places.length; j++) {
                
                const distance =
                    Place.getDistanceBetween2Places(places[i], places[j])

                distances.push({
                    set: [i, j],
                    value: distance
                })
            }
        }

        return distances
    }

    static getDistanceBetween2Places(place1, place2) {
        `
        Compute distance between two points on earth specified by latitude / longitude.
        The earth is assumed to be a perfect sphere of given radius.The radius defaults
        to 6378.388 kilometers.To convert to miles, divide by 1.60934
    
            Reference
        ---------
            Adopted from John D.Cook's blog post: 
        http://www.johndcook.com/blog/python_longitude_latitude/
        `

        // Convert latitude and longitude to spherical coordinates in radians.
        const degrees2Radians = Math.PI / 180.0
        const radius = 6378.388

        // phi = 90 - latitude
        const phi1 = (90.0 - place1.latitude) * degrees2Radians
        const phi2 = (90.0 - place2.latitude) * degrees2Radians

        // theta = longitude
        const theta1 = place1.longitude * degrees2Radians
        const theta2 = place2.longitude * degrees2Radians

        // Compute spherical distance from spherical coordinates.
        const cos = (Math.sin(phi1) * Math.sin(phi2) * Math.cos(theta1 - theta2) +
            Math.cos(phi1) * Math.cos(phi2))
        const arc = Math.acos(cos)
        const rv = arc * radius

        return rv
    }
}

module.exports = Place