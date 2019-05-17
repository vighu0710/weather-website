const request = require('request')

const geoCode = (address,callback) =>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidmlnaHUwNzEwIiwiYSI6ImNqdmdvYTUzNjA4eWIzeWpkMDJ5NDNrOGIifQ.cEzGQ2bR7VHmQ4zirJwOpA&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Network error!',undefined)
        }else if(body.features.length === 0){
            callback('No location!',undefined)
        }else{

            const data = {
                langitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name
            
            }

            callback(undefined,data)
        
        }
    })
}

module.exports = geoCode