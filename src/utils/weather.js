const request = require('request')


const forecast = (latitude, longitude, callback) => {

 //API key weather stack:  5a5cc4a91ed7d0a1c2b78014960a4dfe
const url = 'http://api.weatherstack.com/forecast?access_key=5a5cc4a91ed7d0a1c2b78014960a4dfe&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) 
 
    //Destructure,  remove repsons, go to body
    request({url, json: true}, (error, {body}) => {
    
        if(error)
        { 
            callback('Cannot connect to waether service', undefined)
        }
        else if(body.error)
        {
            callback('Error in request: ' + body.error, undefined)
        }
        else{
            callback(undefined, 'It is currently ' + body.current.temperature + ' degrees out.  It feels like ' + body.current.feelslike)
        } 
       
    })  

}



module.exports = {
    forecast: forecast
}