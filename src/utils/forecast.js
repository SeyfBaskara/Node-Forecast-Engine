const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/aa219d367346f2ebb31c670bae240740/' + latitude + ',' + longitude + '?units=auto'

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const temp = body.currently.temperature
            const rain = body.currently.precipProbability
            const summary = body.daily.data[0].summary
            callback(undefined, summary + ' its currently ' + temp + ' degree out. There is ' + rain + '% chance of rain.')
        }
    })
}
module.exports = forecast