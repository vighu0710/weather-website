const request = require('request')
const geoCode = require('./geocode')

const forecast = (address,callback) => {
    
    geoCode(address, (error,{langitude,longitude,place} = {} ) => {
    
    if(error){
        callback(error,undefined)
    }else{
        const url = 'https://api.darksky.net/forecast/4542bb40d5312bd98e755a08a3a05d71/'+ langitude + ',' + longitude + '?units=si'

         request({ url, json: true }, (error, { body } ) => {
            if(error){
                callback('No network connection!',undefined)
            }else if(body.error){
                callback(body.error,undefined)
            }else{
                const outdata = body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability +'% chance of rain.'

                const forecastData = {
                    outdata,
                    place
                }

                callback(undefined,forecastData)
            }

        })  

    }
    })
}
module.exports = forecast