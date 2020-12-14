const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')  

const app = express()

//define paths for Express config
const viewPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')
 
//Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'CC'

    })

})


app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'About Page',
        name: 'CC'

    })

})


app.get('/help', (req, res) => {
    res.render('help', { 
        title: 'Help Page',
        helptext: 'HELPPP',
        name: 'Christopher'

    })

})


/** 
app.get('', (req, res) => {
    res.send('<h1>Hello Express!</h1>')

})

app.get('/help', (req, res) => {
    res.send( [{name: 'Bob'},{name: 'Chris'}])
    
})


app.get('/about', (req, res) => {
    res.send('About Page')
    
})

 */

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    res.send({
    products: []
    })

})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode.geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

            if(error) {
                return res.send({error})
            }

            weather.forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({error})
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })

    })

    console.log(req.query)
 
    
})

//app.com
//app.com/help
//app.com/about

app.get('/help/*', (req, res) => {
   
    res.render('404', { 
        title: '404', 
        name: 'Christopher',
        errorMessage: 'Help Article not found'

    })
}
)

//404 Page, must be set at end of requests.
app.get('*', (req, res) => {
    res.render('404', { 
        title: '404 ', 
        name: 'Christopher',
        errorMessage: 'Page not found'

    })
}
)

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
