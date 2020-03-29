const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2V5ZmJhc2thcmEiLCJhIjoiY2s4MGVyd2RmMGNweTNlbnE1bHo3OWxwNCJ9.dkITIO2DjHqvv-7YALpUtg'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode