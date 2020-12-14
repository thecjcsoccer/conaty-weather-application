const request = require('request')



//API Map Box Key:  pk.eyJ1IjoidGhlY2pjc29jY2VyIiwiYSI6ImNraWtoZzlubTA5dmgycnJ4ejNyc3F0ZGoifQ.Tcvf3ga5j1qKTKtvfJlPZg

 

const geocode = (address, callback) => {
    const mapURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +  '.json?access_token=pk.eyJ1IjoidGhlY2pjc29jY2VyIiwiYSI6ImNraWtoZzlubTA5dmgycnJ4ejNyc3F0ZGoifQ.Tcvf3ga5j1qKTKtvfJlPZg'

    request({url: mapURL, json: true}, (error, {body}) => {
   
        if(error)
        { 
            callback('Cannot connect to GeoCoding Services', undefined)
        }
        else if(body.message)
        {
            callback('Error in Request: ' + body.message, undefined)
        }   
         else if(body.features.length === 0)
        {
            callback('Unable to find location. try another search', undefined)
        }
        else{
        const lat = body.features[0].center[0]
        const long = body.features[0].center[1]
        callback(undefined, { 
            latitude: lat,
            longitude: long,
            location: body.features[0].place_name  
         })
        }
    }) 

}

module.exports = {
    geocode: geocode
}