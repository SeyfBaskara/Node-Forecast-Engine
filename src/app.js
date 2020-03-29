const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define path for the express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partial')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

//Setup static directory to serve 
app.use(express.static(publicPath))
hbs.registerPartials(partialPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Forecast',
        name: 'Seyfettin Baskara'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide the address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Seyfettin Baskara',
        errormessage: 'Page is not found'
    })
})

app.listen(port, () => {
    console.log("Server is up on port." + port)
})

